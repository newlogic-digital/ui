import { initNaja, replaceScripts } from '@newlogic-digital/utils-js'
import { initStimulus } from '../Libraries/Stimulus.js'
import { initCookieConsent } from '../Libraries/CookieConsent.js'

export default function initAfter(element) {
    initStimulus(element)
    initNaja(element)
    replaceScripts(element)
    initCookieConsent(element)
}
