import { LibStimulus, Controller } from './Stimulus.js'
import { inputValidity } from '../Utils/Functions/+.js'

LibStimulus.register('lib-form', class extends Controller {
    connect () {
        this.element.setAttribute('novalidate', '')
        this.element.addEventListener('submit', e => this.validation(e))
    }

    validation (e) {
        if (this.element.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()

            this.element.querySelector(':invalid').scrollIntoView({ behavior: 'smooth', block: 'center' })
            this.element.querySelector(':invalid').focus()
        } else {
            this.element.querySelector('[type="submit"]').classList.add('loading')
        }

        this.element.querySelectorAll('.ui-control, .ui-check').forEach(element => {
            console.log(element)
            inputValidity(element, { message: true })
        })
    }
})
