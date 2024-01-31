export default function inputValidity (element, options = {}) {
    const { validate, message, iconElements } = {
        validate: true,
        message: false,
        iconElements: '.ui-control',
        ...options
    }

    const selectors = element.querySelectorAll('input, textarea, select')

    selectors.forEach(selector => {
        if (selector.closest('.air-datepicker')) {
            return
        }

        const validationMessage = selector.dataset.validationMessage ?? selector.validationMessage
        const validityElement = element?.closest('.c-field')?.querySelector('.ui-info.validity')

        if (!selector.outerHTML.match(/(data-novalidate|readonly|hidden)/) && validate) {
            element.classList.remove('valid', 'invalid', 'active')

            if (element.closest(iconElements) && element.querySelector('[class^="icon"] [class*="valid"]') !== null) {
                element.querySelector('[class^="icon"] [class*="valid"]').remove()
            }

            if (selector.checkValidity()) {
                element.classList.add('valid')

                if (validityElement) {
                    validityElement.remove()
                }
            } else {
                element.classList.add('invalid')

                if (!validityElement && message) {
                    element?.closest('.c-field')?.insertAdjacentHTML('beforeend', `<div class="ui-info validity text-error">${validationMessage}</div>`)
                }

                if (element.closest(iconElements) && element.querySelector('[class^="icon"] [class*="valid"]') === null) {
                    if (!element.querySelector('.end')) {
                        element.insertAdjacentHTML('beforeend', '<div class="end"></div>')
                    }

                    element.querySelector('.end').insertAdjacentHTML('afterbegin', `
                        <div class="invalid lib-hint-top" tabindex="0" aria-label="${validationMessage}">
                            <svg class="text-error"><use href="#icon-exclamation-circle"></use></svg>
                        </div>
                    `)
                }
            }
        }

        if (selector.value !== '') {
            element.classList.add('active')
        }
    })
}
