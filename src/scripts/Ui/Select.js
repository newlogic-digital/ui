import {LibStimulus, Controller} from "../Libraries/Stimulus.js";

LibStimulus.register("ui-select", class extends Controller {
    validate(element, select) {
        element._removeDataValue("state", "invalid valid focus");

        if (element.querySelector(`[class^="icon"][class*="valid"]`) !== null) {
            element.querySelector(`[class^="icon"][class*="valid"]`).remove();
        }

        let validationMessage = select.validationMessage;

        if (typeof select.dataset.validationMessage !== "undefined") {
            validationMessage = select.dataset.validationMessage;
        }

        if (select.checkValidity()) {
            element._addDataValue("state", "valid");
        } else {
            element._addDataValue("state", "invalid");

            if (element.querySelector(`[class^="icon"][class*="valid"]`) === null) {
                element.insertAdjacentHTML("beforeend", `<span class="icon-r icon-invalid text-error"><span tabindex="0" class="lib-hint-top lib-hint-error" aria-label="${validationMessage}"></span></span>`);
            }
        }
    }
    connect() {
        let self = this, element = self.element,
            select = element.querySelector("select"),
            option = [...element.querySelectorAll("[data-option]")];

        element.addEventListener("click", () => {
            if (!element._hasDataValue("state", "focus")) {
                element._addDataValue("state", "focus");
            } else {
                element._removeDataValue("state", "focus");
            }

            element.addEventListener("blur", function e() {
                element._removeDataValue("state", "focus");
                element.removeEventListener("blur", e);
            }, true);
        }, true);

        element.addEventListener("click", e => {
            if (element._hasDataValue("state", "focus") && e.timeStamp === 0 || e.target.tagName === "OPTION") {
                element._removeDataValue("state", "focus");
            }
        })

        select.addEventListener("change", () => {
            this.validate(element, select);

            if (select.value === "") {
                element._removeDataValue("state", "active");
            } else {
                element._addDataValue("state", "active");
            }
        });

        if (option[0] !== null) {
            option.map(option => {
                option.addEventListener("click", () => {
                    select.value = option.getAttribute("data-option");
                    select.dispatchEvent(new Event('change', { 'bubbles': true }));
                });
            });
        }

        if (select.value === "") {
            element._removeDataValue("state", "active");
        } else {
            element._addDataValue("state", "active");
        }
    }
});