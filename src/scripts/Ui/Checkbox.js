import {LibStimulus, Controller} from "../Libraries/Stimulus.js";

LibStimulus.register("ui-checkbox", class extends Controller {
    validate(element) {
        element.parentNode._removeDataValue("state", "valid invalid")

        if (element.checkValidity()) {
            element.parentNode._addDataValue("state", "valid")

            if (element.type === "radio") {
                [...document.querySelectorAll(`input[name="${element.name}"]`)].map((element) => {
                    element.parentNode._addDataValue("state", "valid")
                });
            }
        } else {
            element.parentNode._addDataValue("state", "invalid")
        }
    }
    connect() {
        let input = this.element.querySelector(`input:not([type="hidden"])`);

        input.addEventListener("change", () => this.validate(input))
    }
})