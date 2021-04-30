import {LibStimulus, Controller} from "../Libraries/Stimulus.js";

LibStimulus.register("c-form", class extends Controller {
    connect() {
        let element = this.element;

        if (typeof HTMLFormElement.prototype.reportValidity !== "undefined") {
            element.setAttribute("novalidate","");
            element.addEventListener('submit', (event) => {
                if (element.reportValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                [...element.querySelectorAll(".ui-input")].map((element) => {
                    console.log(element);
                    LibStimulus.getController(element, "ui-input").validateInput(element, true)
                });

                [...element.querySelectorAll(`.ui-select:not([data-state*="active"]) select[required]`)].map((element) => {
                    element.parentNode._addDataValue("state", "invalid");
                });
            }, false);
        }
    }
});