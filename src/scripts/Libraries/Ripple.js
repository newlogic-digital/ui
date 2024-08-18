import { Controller, LibStimulus } from './Stimulus.js'
import { showRipple } from 'winduum/src/utilities/ripple/index.js'

LibStimulus.register('lib-ripple', class extends Controller {
    async show(event) {
        showRipple(event)
    }
})
