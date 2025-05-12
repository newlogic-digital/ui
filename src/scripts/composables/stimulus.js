import { Application, Controller } from '@hotwired/stimulus'
import { InvokeFetch } from 'winduum-stimulus/utilities/invoke/index.js'
import stimulus from 'winduum-stimulus'
import { initAfter } from '../utils/+.js'

const initConfig = {
  controllers: ['x-button', 'x-control', 'x-text', 'x-check', 'x-dialog'],
  actions: [
    ['.x-button', 'click->x-button#ripple'],
    ['.x-check', 'change->x-form#validateField'],
    ['.x-switch', 'change->x-form#validateField'],
    ['[data-invoke-action]:not([data-naja], [data-action*="invoke#action"])', 'invoke#action'],
  ],
}

const useStimulus = new Application(document.documentElement)

const useController = (controller, target, application = useStimulus) =>
  stimulus.useController(controller, target, application)

const initStimulus = (element, { controllers, actions } = initConfig) =>
  stimulus.initStimulus(element, { controllers, actions })

useStimulus.start().then(() => initStimulus(document.body))
useStimulus.register('invoke', class extends InvokeFetch {
  onFetchComplete(element) {
    initAfter(element)
  }
})

export { useStimulus, useController, Controller, initStimulus, initConfig }
