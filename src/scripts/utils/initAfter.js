import { replaceScripts } from '@newlogic-digital/utils-js'
import { initCookieConsent } from '@newlogic-digital/cookieconsent-js'
import { initStimulus } from '../composables/stimulus.js'
import { initNaja } from '@newlogic-digital/naja-extensions'

export default function initAfter(element) {
  initStimulus(element)
  initNaja(element)
  replaceScripts(element)
  initCookieConsent(element)
}
