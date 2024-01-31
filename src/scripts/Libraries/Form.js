import { LibStimulus, Controller } from './Stimulus.js'
import { inputValidity } from '../Utils/Functions/+.js'

LibStimulus.register('lib-form', class extends Controller {
    connect () {
        this.element.setAttribute('novalidate', '')
        this.element.addEventListener('submit', e => this.validation(e))
    }

    validation ({ submitter }) {
        if (this.element.checkValidity() === false) {
            arguments[0].preventDefault()
            arguments[0].stopImmediatePropagation()

            this.element.querySelector(':invalid').scrollIntoView({ behavior: 'smooth', block: 'center' })
            this.element.querySelector(':invalid').focus()
        } else {
            submitter?.classList.add('loading')
        }

        this.element.querySelectorAll('.ui-control, .ui-check, .ui-switch').forEach(element => {
            inputValidity(element, { message: true })
        })
    }
})
