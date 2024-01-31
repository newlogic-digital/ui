import { Controller, LibStimulus } from './Stimulus.js'
import { showRipple } from 'winduum/src/utilities/ripple.js'

LibStimulus.register('lib-ripple', class extends Controller {
    async show (e) {
        showRipple(e)
    }
})
