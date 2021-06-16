import { LibStimulus, Controller } from '../Libraries/Stimulus.js'

LibStimulus.register('ui-checkbox', class extends Controller {
    validate(element) {
        element.parentNode._removeDataValue('state', 'valid invalid')

        if (element.checkValidity()) {
            element.parentNode._addDataValue('state', 'valid')
        } else {
            element.parentNode._addDataValue('state', 'invalid')
        }
    }

    connect() {
        const input = this.element.querySelector('input:not([type="hidden"])')

        input.addEventListener('change', () => this.validate(input))
    }
})
