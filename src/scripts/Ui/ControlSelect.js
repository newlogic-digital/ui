import { LibStimulus, Controller } from '../Libraries/Stimulus.js'
import { dataset } from '@newlogic-digital/utils-js'

LibStimulus.register('ui-control-select', class extends Controller {
    connect() {
        this.select = this.element.querySelector('select')
        const option = this.element.querySelectorAll('[data-option]')

        if (option[0]) {
            option.forEach((option) => {
                if (option.dataset.disabled) {
                    return
                }

                dataset(option, 'action').add('click->ui-control-select#choose', 'keydown.enter->ui-control-select#choose')
            })
        }
    }

    choose({ currentTarget }) {
        this.select.value = currentTarget.dataset.option
        this.select.dispatchEvent(new Event('change', { bubbles: true }))
        document.activeElement.blur()
    }
})
