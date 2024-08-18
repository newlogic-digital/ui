import { LibStimulus, Controller } from './Stimulus.js'
import { validateForm } from 'winduum/src/components/form/index.js'

LibStimulus.register('lib-form', class extends Controller {
    connect() {
        this.element.noValidate = true
        this.element.addEventListener('submit', this.validate)
    }

    async validate(event) {
        validateForm(event)
    }
})
