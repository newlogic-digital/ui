import { LibStimulus, Controller } from '../Libraries/Stimulus.js'
import { checkValidity } from '../Utils/Functions/+.js'

['ui-checkbox', 'ui-radio'].forEach(identifier => LibStimulus.register(identifier, class extends Controller {
    connect() {
        const input = this.element.querySelector('input:not([type="hidden"])')

        input.addEventListener('change', () => checkValidity(this.element))
    }
}))
