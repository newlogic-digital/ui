import { Application, Controller } from '@hotwired/stimulus'
import { dataset } from '@newlogic-digital/utils-js'

function initActions(parent, selectors) {
    if (!parent) return

    selectors.forEach(([selector, action]) => {
        parent.querySelectorAll(selector).forEach((element) => {
            dataset(element, 'action').add(action)
        })
    })
}

function initControllers(parent, selectors) {
    if (!parent) return

    selectors.forEach((selector) => {
        [...parent.getElementsByClassName(selector)].forEach((element) => {
            dataset(element, 'controller').add(selector)
        })
    })
}

function initStimulus(element, { controllers, actions } = {
    controllers: ['ui-control', 'ui-text', 'ui-check'],
    actions: [['.ui-btn', 'click->lib-ripple#show'], ['.ui-check', 'change->ui-check#validate']]
}) {
    initControllers(element, controllers)
    initActions(element, actions)
}

const LibStimulus = new Application(document.documentElement)

const getController = (...arg) => LibStimulus.getControllerForElementAndIdentifier(...arg)

const delegateController = (name, method, event = {}, selector) => {
    const controller = getController(document.querySelector(selector || `.${name}`), name)

    if (controller) return method ? controller[method](event) : controller
}

LibStimulus.start().then(() => initStimulus(document.body))

LibStimulus.register('controller', class extends Controller {
    delegate(event) {
        delegateController(event.params.name, event.params.method, event, event.params.selector)
    }

    load({ currentTarget, params }) {
        dataset(currentTarget, 'controller').add(params.name)
    }
})

window.LibStimulus = { default: LibStimulus, Controller, initStimulus, delegateController }

export { LibStimulus, Controller, initStimulus, getController, delegateController }
