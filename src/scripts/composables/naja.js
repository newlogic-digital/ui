import naja from 'naja'
import {
    NajaCoreExtension,
    NajaInvokeExtension,
    NajaCheckValidityExtension
} from '@newlogic-digital/naja-extensions'
import { initCookieConsent } from '@newlogic-digital/cookieconsent-js'
import { initStimulus } from './stimulus.js'
import { useSwup } from './swup.js'

naja.registerExtension(NajaCoreExtension())
naja.registerExtension(NajaInvokeExtension())
naja.registerExtension(NajaCheckValidityExtension())

naja.snippetHandler.addEventListener('afterUpdate', ({ detail }) => {
    initStimulus(detail.snippet)
    initCookieConsent(detail.snippet)

    useSwup.cache.clear()
})

naja.initialize({
    history: 'replace'
})
