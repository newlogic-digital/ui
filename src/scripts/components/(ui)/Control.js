import { useStimulus } from '../../composables/stimulus.js'
import { Control } from 'winduum-stimulus/components/control/index.js'
import { validateField } from 'winduum/src/components/form/index.js'

useStimulus.register('x-control', class extends Control {
    connect() {
        validateField(this.element, { validate: false })

        this.element.addEventListener('change', () => validateField(this.element))
    }
})
