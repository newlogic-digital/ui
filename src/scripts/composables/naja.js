import { default as useNaja } from 'naja'
import {
    initNaja,
    NajaCoreExtension,
    NajaInvokeExtension,
    NajaCheckValidityExtension
} from '@newlogic-digital/naja-extensions'
import { initCookieConsent } from '@newlogic-digital/cookieconsent-js'
import { initStimulus } from './stimulus.js'
import useSwup from './swup.js'

useNaja.registerExtension(NajaCoreExtension())
useNaja.registerExtension(NajaInvokeExtension())
useNaja.registerExtension(NajaCheckValidityExtension())

useNaja.snippetHandler.addEventListener('afterUpdate', ({ detail }) => {
    initStimulus(detail.snippet)
    initNaja(detail.snippet)
    initCookieConsent(detail.snippet)

    useSwup.cache.clear()
})

useNaja.initialize()

export { useNaja, initNaja }
