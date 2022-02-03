import { LibStimulus, Controller } from '../Libraries/Stimulus.js'

LibStimulus.register('ui-select', class extends Controller {
    validate(element, select) {
        element._removeDataValue('state', 'invalid valid focus')

        if (element.querySelector('[class^="icon"][class*="valid"]') !== null) {
            element.querySelector('[class^="icon"][class*="valid"]').remove()
        }

        let validationMessage = select.validationMessage

        if (typeof select.dataset.validationMessage !== 'undefined') {
            validationMessage = select.dataset.validationMessage
        }

        if (select.checkValidity()) {
            element._addDataValue('state', 'valid')
        } else {
            element._addDataValue('state', 'invalid')

            if (element.querySelector('[class^="icon"][class*="valid"]') === null) {
                const icon = element.querySelector('.icon-r')
                const elm = icon || element
                const where = icon ? 'afterend' : 'beforeend'

                elm.insertAdjacentHTML(where, `<div class="icon-r icon-invalid text-error lib-hint-top lib-hint-error" tabindex="0" aria-label="${validationMessage}"><svg><use href="#icon-exclamation-circle"></use></svg></div>`)
            }
        }
    }

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
            }, true)
        }, true)

        element.addEventListener('click', e => {
            if ((element._hasDataValue('state', 'focus') && e.timeStamp === 0) || e.target.tagName === 'OPTION') {
                element._removeDataValue('state', 'focus')
            }
        })

        select.addEventListener('change', () => {
            this.validate(element, select)

            if (select.value === '') {
                element._removeDataValue('state', 'active')
            } else {
                element._addDataValue('state', 'active')
            }
        })

        if (option[0] !== null) {
            option.forEach(option => {
                option.addEventListener('click', () => {
                    select.value = option.getAttribute('data-option')
                    select.dispatchEvent(new Event('change', { bubbles: true }))
                })
            })
        }

        if (select.value === '') {
            element._removeDataValue('state', 'active')
        } else {
            element._addDataValue('state', 'active')
        }
    }
})
