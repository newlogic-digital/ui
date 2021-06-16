const dynamicControllers = ['ui-input', 'ui-select', 'ui-wsw', 'ui-checkbox', 'ui-radio', 'c-cookieconsent', 'c-form-cookieconsent']
const dynamicActions = [['a[href^="#"]', 'click->lib#anchor'], ['.ui-btn', 'click->lib#ripple']]

function loadControllers(parent, selectors) {
    if (parent !== null) {
        selectors.forEach(selector => {
            [...parent.getElementsByClassName(selector)].forEach(element => {
                if (element.getAttribute('data-controller') === null) {
                    element.setAttribute('data-controller', selector)
                }
            })
        })
    }
}

function loadActions(parent, selectors) {
    if (parent !== null) {
        selectors.forEach(selector => {
            parent.querySelectorAll(selector[0]).forEach(element => {
                const attribute = element.getAttribute('data-action')

                if (attribute === null) {
                    element.setAttribute('data-action', selector[1])
                } else if (attribute.indexOf(selector[1]) === -1) {
                    element.setAttribute('data-action', `${attribute} ${selector[1]}`)
                }
            })
        })
    }
}

export default function loadStimulus(selector) {
    loadControllers(selector, dynamicControllers)
    loadActions(selector, dynamicActions)
}
