import { Controller, LibStimulus, initStimulus } from './Stimulus.js'
import { initCookieConsent } from './CookieConsent.js'
import {
    initNaja,
    NajaRecaptchaExtension,
    NajaFormValidityExtension
} from '../Utils/naja.js'
import naja from 'naja'
import LibSwup from './Swup.js'

LibStimulus.register('lib-naja', class extends Controller {
    async initialize() {
        naja.uiHandler.selector = '[data-naja]'

        await initNaja(this.element, false)

        if (naja.initialized) return

        naja.uiHandler.addEventListener('interaction', ({ detail }) => {
            detail.element.dispatchEvent(new CustomEvent('naja:interaction', { bubbles: true, cancelable: true }))
        })

        naja.snippetHandler.addEventListener('afterUpdate', ({ detail }) => {
            detail.snippet.dispatchEvent(new CustomEvent('naja:afterUpdate', { bubbles: true, cancelable: true }))

            initStimulus(detail.snippet)
            initNaja(detail.snippet)
            initCookieConsent(detail.snippet)

            LibSwup.cache.clear()
        })

        naja.registerExtension(NajaRecaptchaExtension)
        naja.registerExtension(NajaFormValidityExtension)
        naja.initialize()
    }
})
