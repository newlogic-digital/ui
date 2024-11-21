import { useStimulus } from '../../composables/stimulus.js'
import { Dialog } from 'winduum-stimulus/components/dialog/index.js'

useStimulus.register('x-dialog', class extends Dialog {
    connect() {
        super.connect()

        this.element.addEventListener('x-dialog:show', () => this.appendToaster(this.element))
        this.element.addEventListener('close', () => this.appendToaster(document.body))
    }

    appendToaster(parentElement) {
        const toasterElement = document.querySelector('.x-toaster')

        if (toasterElement) parentElement.appendChild(toasterElement)
    }
})
