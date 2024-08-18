import { Controller, LibStimulus } from '../Libraries/Stimulus.js'
import { dataset, fetchJson } from '@newlogic-digital/utils-js'
import initAfter from '../Utils/initAfter.js'

LibStimulus.register('c-popover', class extends Controller {
    static values = {
        url: String,
        insertTo: String,
        manual: Boolean
    }

    async toggle({ currentTarget, params }) {
        const { togglePopover } = await import('winduum/src/components/popover/index.js')
        const hasUrlValue = this.hasUrlValue && !this.popoverTarget

        if (hasUrlValue) await this.fetch()

        this.popoverTarget = document.getElementById(currentTarget.getAttribute('popovertarget'))

        if (hasUrlValue) initAfter(this.popoverTarget)

        await togglePopover(currentTarget, params)
    }

    async hide() {
        if (this.popoverActionTarget.ariaExpanded !== 'true') return

        const { hidePopover } = await import('winduum/src/components/popover/index.js')

        await hidePopover(this.popoverActionTarget)
    }

    async dismiss({ target }) {
        if (this.popoverActionTarget.ariaExpanded !== 'true') return

        if (!this.popoverTarget.contains(target) && !this.popoverActionTarget.isEqualNode(target) && this.popoverActionTarget.ariaExpanded === 'true') {
            await this.hide()
        }
    }

    async fetch() {
        this.popoverActionTarget.classList.add('loading', 'cursor-wait')

        const { content } = await fetchJson(this.urlValue)

        this.popoverActionTarget.classList.remove('loading', 'cursor-wait')

        const insertElement = !this.hasInsertToValue ? this.popoverActionTarget : document.querySelector(this.insertToValue)
        insertElement.insertAdjacentHTML(!this.hasInsertToValue ? 'afterend' : 'beforeend', content)

        return content
    }

    connect() {
        this.popoverActionTarget = this.element.querySelector('[popovertargetaction]')

        if (!this.popoverActionTarget) return

        ;(!this.hasManualValue || !this.manualValue) && dataset(this.popoverActionTarget, 'action').add(
            `click->c-popover#${this.popoverActionTarget.getAttribute('popovertargetaction')}:prevent`,
            'keydown.esc@window->c-popover#hide',
            'click@window->c-popover#dismiss'
        )
    }
})
