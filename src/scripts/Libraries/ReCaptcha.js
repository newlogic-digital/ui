import { LibStimulus, Controller } from './Stimulus.js'
import importScript from '../Utils/Functions/importScript.js'
import cdn from '../Utils/cdn.js'

LibStimulus.register('lib-recaptcha', class extends Controller {
    static values = {
        api: String,
        action: String
    }

    connect() {
        importScript(cdn.recaptcha.replace('{apikey}', this.apiValue))
    }

    async execute() {
        return new Promise(resolve => {
            window.grecaptcha.enterprise.ready(() => {
                window.grecaptcha.enterprise.execute(this.apiValue, { action: this.actionValue ?? 'form' }).then(token => {
                    this.element.querySelector('[name="gtoken"]').value = token
                    resolve()
                })
            })
        })
    }

    async submit() {
        arguments[0].preventDefault()

        await this.execute()
        this.element.submit()
    }
})
