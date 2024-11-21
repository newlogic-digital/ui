import { useStimulus } from '../../composables/stimulus.js'
import { Popover } from 'winduum-stimulus/components/popover/index.js'
import { nextRepaint } from 'winduum/src/common.js'

useStimulus.register('x-popover', class extends Popover {
    async actionToggle() {
        this.element.querySelector('[popovertargetaction]').setAttribute(`data-${this.identifier}-target`, 'action')

        await nextRepaint()

        await this.toggle({ currentTarget: this.actionTarget })
    }
})
