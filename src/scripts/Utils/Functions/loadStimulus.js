let dynamicControllers = ["ui-input", "ui-select", "ui-wsw", "c-cookieconsent", "c-form-cookieconsent"];
let dynamicActions = [[`a[href^="#"]`, "click->lib#anchor"], [`.ui-btn`, "click->lib#ripple"]];

function loadControllers(parent, selectors) {
    if (parent !== null) {
        selectors.forEach((selector) => {
            [...parent.getElementsByClassName(selector)].filter((element) => {
                if (element.getAttribute("data-controller") === null) {
                    element.setAttribute("data-controller", element.className.split(" ")[0]);
                }
            });
        });
    }
}

function loadActions(parent, selectors) {
    if (parent !== null) {
        selectors.forEach((selector) => {
            [...parent.querySelectorAll(selector[0])].filter((element) => {
                let attribute = element.getAttribute("data-action");

                if (attribute === null) {
                    element.setAttribute("data-action", selector[1]);
                } else if (attribute.indexOf(selector[1]) === -1) {
                    element.setAttribute("data-action", `${attribute} ${selector[1]}`);
                }
            });
        });
    }
}

function loadStimulus(selector) {
    loadControllers(selector, dynamicControllers);
    loadActions(selector, dynamicActions);
}

export default loadStimulus;