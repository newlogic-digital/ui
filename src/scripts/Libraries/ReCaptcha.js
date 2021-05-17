import { LibStimulus, Controller } from "./Stimulus.js";
import importScript from "../Utils/Functions/importScript.js";
import cdn from "../Utils/cdn.js";

LibStimulus.register("lib-recaptcha", class extends Controller {
    connect() {
        setTimeout(() => this.captcha(), 2500);

        this.interval = setInterval(() => this.captcha(), 150000);
    }

    captcha() {
        importScript(cdn.recaptcha.replace("{apikey}", this.data.get("api"))).then(() => {
            window.grecaptcha.ready(() => {
                window.grecaptcha.execute(this.data.get("api"), {action: 'form'}).then(token => {
                    this.element.querySelector(`[name="gtoken"]`).value = token;
                });
            });
        })
    }

    disconnect() {
        clearInterval(this.interval);
    }
});