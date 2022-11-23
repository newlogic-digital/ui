export default function checkValidity(element, options = {}) {
    const { validate, message } = Object.assign({ validate: true, message: false }, options)
    const selectors = element.querySelectorAll('input, textarea, select')

    selectors.forEach(selector => {
        const isInput = element.classList.contains('ui-input')
        const isSelect = element.classList.contains('ui-select')
        const validationMessage = selector.dataset.validationMessage ?? selector.validationMessage
        const validityElement = element.closest('.ui-input-group')?.querySelector('em') ?? element.querySelector('em')

        if (!selector.outerHTML.match(/(data-novalidate|readonly|hidden)/) && validate) {
            element._removeDataValue('state', 'valid invalid active')

            if ((isInput || isSelect) && element.querySelector('[class^="icon"][class*="valid"]') !== null) {
                element.querySelector('[class^="icon"][class*="valid"]').remove()
            }

            if (selector.checkValidity()) {
                element._addDataValue('state', 'valid')

                if (validityElement) {
                    validityElement.remove()
                }
            } else {
                element._addDataValue('state', 'invalid')

                if (!validityElement && message) {
                    (element.closest('.ui-input-group') ?? element).insertAdjacentHTML('beforeend', `<em>${validationMessage}</em>`)
                }

                if ((isInput || isSelect) && element.querySelector('[class^="icon"][class*="valid"]') === null) {
                    const icon = element.querySelector('.icon-r')
                    const where = icon || element

                    where.insertAdjacentHTML(icon ? 'afterend' : 'beforeend', `<div class="icon-r icon-invalid text-error lib-hint-top lib-hint-error" tabindex="0" aria-label="${validationMessage}"><svg><use href="#icon-exclamation-circle"></use></svg></div>`)
                }
            }
        }

        if (isInput && selector.value !== '') {
            element._addDataValue('state', 'active')
        }
    })
}
