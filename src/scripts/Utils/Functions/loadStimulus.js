import naja from 'naja'

const dynamicControllers = ['ui-control', 'ui-text', 'ui-check']
const dynamicActions = [['.ui-btn', 'click->lib-ripple#show'], ['.ui-check', 'change->ui-check#validity']]

function loadControllers (parent, selectors) {
    if (parent !== null) {
        selectors.forEach(selector => {
            [...parent.getElementsByClassName(selector)].forEach(element => {
                const attribute = element.getAttribute('data-controller')

                if (attribute === null) {
                    element.setAttribute('data-controller', selector)
                } else {
                    element.setAttribute('data-controller', `${attribute} ${selector}`)
                }
            })
        })
    }
}

function loadActions (parent, selectors) {
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

export default function loadStimulus (selector, najaLoad = true) {
    loadControllers(selector, dynamicControllers)
    loadActions(selector, dynamicActions)
    najaLoad && naja.uiHandler.bindUI(selector)
}
