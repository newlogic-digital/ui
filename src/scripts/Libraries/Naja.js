import naja from 'naja'
import { Controller, LibStimulus, loadStimulus } from './Stimulus.js'

LibStimulus.register('lib-naja', class extends Controller {
    async connect () {
        naja.uiHandler.addEventListener('interaction', ({ detail }) => {
            const element = detail.element

            detail.options.target = element

            element.dispatchEvent(new CustomEvent('naja:interaction', { bubbles: true, cancelable: true }))

            if (element?.form && !element.form.reportValidity()) {
                arguments[0].preventDefault()
            }
        })

        naja.snippetHandler.addEventListener('afterUpdate', ({ detail }) => {
            detail?.options.target.dispatchEvent(new CustomEvent('naja:afterUpdate', { bubbles: true, cancelable: true }))

            loadStimulus(document.body, false)
        })

        naja.uiHandler.selector = '[data-naja]'

        naja.initialize({
            history: false
        })
    }

    async makeRequest ({ currentTarget, params }) {
        const { href, action, method, form } = currentTarget

        arguments[0]?.preventDefault()

        await naja.makeRequest(
            params.method ?? (method ?? 'GET'),
            params.url ?? (href ?? action),
            params.data ?? (form ? new FormData(form) : action ? new FormData(currentTarget) : null),
            {
                history: (action || form) ? 'replace' : false,
                ...(params.options ?? {})
            }
        )
    }
})
