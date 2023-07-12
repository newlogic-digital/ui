import { LibStimulus, Controller } from '../Libraries/Stimulus.js'
import { inputValidity } from '../Utils/Functions/+.js'

LibStimulus.register('ui-check', class extends Controller {
    validity ({ currentTarget }) {
        inputValidity(currentTarget)
    }
})
