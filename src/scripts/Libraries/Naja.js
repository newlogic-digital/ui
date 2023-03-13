import naja from 'naja'
import { Controller, LibStimulus, loadStimulus } from './Stimulus.js'

LibStimulus.register('lib-naja', class extends Controller {
    async connect() {
        naja.uiHandler.addEventListener('interaction', ({ detail }) => {
            const element = detail.element

            detail.options.target = element

            element.dispatchEvent(new CustomEvent('naja-interaction', { bubbles: true, cancelable: true }))

            if (element?.form && !element.form.reportValidity()) {
                arguments[0].preventDefault()
            }
        })

        naja.snippetHandler.addEventListener('afterUpdate', ({ detail }) => {
            detail?.options.target.dispatchEvent(new CustomEvent('naja-afterUpdate', { bubbles: true, cancelable: true }))

            loadStimulus(document.body, false)
        })

        naja.uiHandler.selector = '[data-naja]'
        naja.initialize({
            history: false
        })
    }

    async fetch({ currentTarget }) {
        arguments[0].preventDefault()

        await naja.makeRequest('GET', currentTarget.dataset.actionUrl, null, { history: false })
    }
})
