import { LibStimulus, Controller } from './Stimulus.js'
import { checkValidity } from '../Utils/Functions/+.js'

LibStimulus.register('lib-form', class extends Controller {
    connect() {
        this.element.setAttribute('novalidate', '')
        this.element.addEventListener('submit', e => this.validation(e))
    }

    validation(e) {
        if (this.element.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()

            this.element.querySelector(':invalid').scrollIntoView({ behavior: 'smooth', block: 'center' })
            this.element.querySelector(':invalid').focus()
        } else {
            this.element.querySelector('[type="submit"]')._addDataValue('state', 'loading')
        }

        this.element.querySelectorAll('.ui-input, [data-controller="ui-checkbox"], [data-controller="ui-radio"]').forEach(element => {
            checkValidity(element, { message: true })
        })

        this.element.querySelectorAll('.ui-select:not([data-state*="active"]) select[required]').forEach(select => {
            checkValidity(select.closest('.ui-select'), { message: true })
        })
    }

    submitForm({ currentTarget }) {
        currentTarget.form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    }
})
