import {LibStimulus, Controller} from "../Libraries/Stimulus.js";

LibStimulus.register("ui-radio", class extends Controller {
    validate(element) {
        if (element.checkValidity()) {
            element.parentNode._addDataValue("state", "valid")
        } else {
            element.parentNode._addDataValue("state", "invalid")
        }
    }
    connect() {
        let checkbox = this.element.querySelector(`input:not([type="hidden"])`);

        checkbox.addEventListener("change", () => this.validate(checkbox))
    }
})