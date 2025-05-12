import { useStimulus } from '../../composables/stimulus.js'
import { Form } from 'winduum-stimulus/components/form/index.js'
import { validateForm } from 'winduum/src/components/form/index.js'

useStimulus.register('x-form', class extends Form {
  requestSubmit() {
    this.element.requestSubmit()
  }

  reset(event) {
    this.element.reset()

    validateForm(event, { validateOptions: { validate: false } })
  }
})
