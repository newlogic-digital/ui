import { LibStimulus, Controller } from './Stimulus.js'
import naja from 'naja'
import importScript from '../Utils/Functions/importScript.js'
import cdn from '../Utils/cdn.js'

LibStimulus.register('lib-recaptcha', class extends Controller {
    static values = {
        api: String,
        action: String
    }

    connect () {
        importScript(cdn.recaptcha.replace('{apikey}', this.apiValue))
    }

    async execute () {
        return new Promise(resolve => {
            window.grecaptcha.enterprise.ready(() => {
                window.grecaptcha.enterprise.execute(this.apiValue, { action: this.actionValue ?? 'form' }).then(token => {
                    this.element.querySelector('[name="gtoken"]').value = token
                    resolve()
                })
            })
        })
    }

    async submit ({ params }) {
        if (this.element.reportValidity() === false) {
            return false
        }

        arguments[0].preventDefault()

        await this.execute()

        if (!params.naja) {
            this.element.submit()
        } else {
            await naja.makeRequest(this.element.method, this.element.action, new FormData(this.element), { history: 'replace' })
        }
    }
})
