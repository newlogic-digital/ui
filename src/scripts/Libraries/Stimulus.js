import { Application, Controller as DefaultController } from '@hotwired/stimulus'
import loadStimulus from '../Utils/Functions/loadStimulus.js'

const LibStimulus = new Application(document.documentElement)

const getController = (element, identifier) => LibStimulus.getControllerForElementAndIdentifier(element, identifier)

class Controller extends DefaultController {
    getValue(value) {
        return this[`${value}Value`]
    }

    setValue(type, value) {
        this[`${type}Value`] = value
    }

    hasValue(value) {
        return this.data.has(`${value}Value`)
    }

    getClass(value) {
        return this.data.get(`${value}Class`)
    }

    queryTarget(target) {
        return this.targets.find(target)
    }

    queryTargetAll(targets) {
        return this.targets.findAll(targets)
    }

    hasTarget(target) {
        return this.targets.has(target)
    }
}

LibStimulus.start().then(() => loadStimulus(document.body))

window.LibStimulus = { default: LibStimulus, Controller, loadStimulus }

export { LibStimulus, Controller, loadStimulus, getController }
