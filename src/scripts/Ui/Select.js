import { LibStimulus, Controller } from '../Libraries/Stimulus.js'
import { checkValidity } from '../Utils/Functions/+.js'

LibStimulus.register('ui-select', class extends Controller {
    connect() {
        const element = this.element
        const select = element.querySelector('select')
        const option = element.querySelectorAll('[data-option]')

        element.addEventListener('click', () => {
            if (!element._hasDataValue('state', 'focus')) {
                element._addDataValue('state', 'focus')
            } else {
                element._removeDataValue('state', 'focus')
            }

            element.addEventListener('blur', function e() {
                element._removeDataValue('state', 'focus')
                element.removeEventListener('blur', e)
            })
        })

        element.addEventListener('click', e => {
            if ((element._hasDataValue('state', 'focus') && e.timeStamp === 0) || e.target.tagName === 'OPTION') {
                element._removeDataValue('state', 'focus')
            }
        })

        select.addEventListener('change', () => {
            checkValidity(element)
            this.valueCheck(select)
        })

        if (option[0] !== null) {
            option.forEach(option => {
                option.addEventListener('click', () => {
                    select.value = option.getAttribute('data-option')
                    select.dispatchEvent(new Event('change', { bubbles: true }))
                })
            })
        }

        this.valueCheck(select)
    }

    valueCheck(select) {
        if (select.value === '') {
            this.element._removeDataValue('state', 'active')
        } else {
            this.element._addDataValue('state', 'active')
        }
    }
})
