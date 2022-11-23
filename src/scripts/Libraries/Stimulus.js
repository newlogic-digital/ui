import { Application, Controller } from '@hotwired/stimulus'
import loadStimulus from '../Utils/Functions/loadStimulus.js'

const LibStimulus = new Application(document.documentElement)

const getController = (element, identifier) => LibStimulus.getControllerForElementAndIdentifier(element, identifier)

LibStimulus.start().then(() => loadStimulus(document.body))

window.LibStimulus = { default: LibStimulus, Controller, loadStimulus }

export { LibStimulus, Controller, loadStimulus, getController }
