import { LibStimulus, Controller } from './Stimulus.js'
import importScript from '../Utils/Functions/importScript.js'
import cdn from '../Utils/cdn.js'

LibStimulus.register('lib-recaptcha', class extends Controller {
    connect() {
        importScript(cdn.recaptcha.replace('{apikey}', this.data.get('api')))
    }

    execute(e) {
        e.preventDefault()

        window.grecaptcha.enterprise.ready(() => {
            window.grecaptcha.enterprise.execute(this.data.get('api'), { action: this.data.get('action') ? this.data.get('action') : 'form' }).then(token => {
                this.element.querySelector('[name="gtoken"]').value = token
            })
        })
    }
})
