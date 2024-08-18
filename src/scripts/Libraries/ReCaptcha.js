import { LibStimulus, Controller } from './Stimulus.js'
import { importScript } from '@newlogic-digital/utils-js'
import cdn from '../Utils/cdn.js'

LibStimulus.register('lib-recaptcha', class extends Controller {
    static values = {
        api: String,
        action: String
    }

    connect() {
        importScript(cdn.recaptcha.replace('{apikey}', this.apiValue))
    }

    execute(event) {
        if (event?.detail?.recaptchaExecuted) return

        window.grecaptcha.enterprise.ready(() => {
            window.grecaptcha.enterprise.execute(this.apiValue, { action: this.actionValue ?? 'form' }).then((token) => {
                this.element.gtoken.value = token
                this.element.dispatchEvent(new CustomEvent('submit', { cancelable: true, detail: { recaptchaExecuted: true } }))
            })
        })
    }
})
