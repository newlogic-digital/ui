import { LibStimulus, Controller, getController } from '../Libraries/Stimulus.js'

LibStimulus.register('c-form', class extends Controller {
    validate(element, e) {
        if (element.reportValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        }

        element.querySelectorAll('.ui-input').forEach(element => {
            getController(element, 'ui-input').validate(element, true)
        })

        element.querySelectorAll('.ui-select:not([data-state*="active"]) select[required]').forEach(select => {
            getController(select.parentNode, 'ui-select').validate(select.parentNode, select)
        })

        element.querySelectorAll('[data-controller="ui-checkbox"] input:not([type="hidden"])').forEach(input => {
            input.parentNode._removeDataValue('state', 'valid invalid')

            if (input.checkValidity()) {
                input.parentNode._addDataValue('state', 'valid')
            } else {
                input.parentNode._addDataValue('state', 'invalid')
            }
        })
    }

    connect() {
        this.element.setAttribute('novalidate', '')
        this.element.addEventListener('submit', e => this.validate(this.element, e))
    }
})
