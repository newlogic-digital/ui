import {LibStimulus, Controller} from "../Libraries/Stimulus.js";

LibStimulus.register("ui-select", class extends Controller {
    connect() {
        let self = this, element = self.element,
            select = element.querySelector("select"),
            option = [...element.querySelectorAll("[data-option]")];

        element.addEventListener("click", () => {
            console.log(element._hasDataValue("state", "focus"));
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

        select.addEventListener("change", () => {
            element._removeDataValue("state", "invalid valid");

            if (select.checkValidity()) {
                element._addDataValue("state", "valid");
            } else {
                element._addDataValue("state", "invalid");
            }

            if (select.value === "") {
                element._removeDataValue("state", "active");
            } else {
                element._addDataValue("state", "active");
            }
        });

        if (option[0] !== null) {
            option.map((option) => {
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