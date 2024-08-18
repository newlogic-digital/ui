import { LibStimulus, Controller } from '../Libraries/Stimulus.js'
import { validateField } from 'winduum/src/components/form/index.js'

LibStimulus.register('ui-check', class extends Controller {
    async validate({ currentTarget }) {
        validateField(currentTarget)
    }
})
