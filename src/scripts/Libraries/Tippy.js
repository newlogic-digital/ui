import {loadStimulus} from "../Utils/Functions/+.js";


const LibTippy2 = {
    options: {

    },
    init: () => {

    }
}

export default function LibTippy(element, attributes = ["tooltip", ""], onShow, onHide) {
    let type = attributes[0];
    let template = attributes[1];

    let options = {
        content: "",
        placement: "bottom",
        trigger: "mouseenter focus",
        interactive: true,
        offset: [0, 10],
        appendTo: "parent",
        maxWidth: "none",
        arrow: false,
        theme: 'light-border',
        animation: "scale",
        inertia: true,
        allowHTML: true,
        showOnCreate: false,
        onShow(instance) {
            let name = attributes[1];

            if (typeof name === "undefined") {
                name = attributes[0];
            }

            instance.popper.querySelector(".tippy-box").setAttribute("data-name", name);

            loadStimulus(instance.popper.querySelector(".tippy-content"));

            if (onShow) {
                onShow(instance);
            }
        },
        onHide(instance) {
            if (onHide) {
                onHide(instance);
            }
        }
    }

    if (type.includes("dropdown")) {
        options.trigger = "click"
        options.placement = "bottom-end"
        options.arrow = false
    }

    const init = (options) => new Promise(async (resolve) => {
        const tippy = (await import("tippy.js")).default;
        const {roundArrow} = await import("tippy.js");

        if (typeof element._tippy !== "undefined") {
            return false;
        }

        if (type.includes("arrow")) {
            options.arrow = roundArrow
        }

        if (!template.startsWith("/")) {
            if (template !== "") {
                options.content = document.querySelector('#' + template).innerHTML
            } else {
                options.content = `
                    <div class="ui-dropdown">
                        <div class="wrp_dropdown_body">
                            ${element.getAttribute("aria-label")}
                        </div>
                    </div>
                `;
            }
        }

        tippy(element, options)
    })

    options.showOnCreate = true;
    options.trigger.split(" ").map(event => {
        element.addEventListener(event, function e() {
            if (template.startsWith("/") && options.content === "") {
                element.style.cursor = "wait";

                fetch(template, {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then(response => {
                    return response.json();
                }).then(async (data) => {
                    options.content = data["dialog"];
                    element.style.cursor = "";
                    await init(options);
                    element.removeEventListener(event, e);
                })
            } else {
                init(options);
                element.removeEventListener(event, e);
            }
        })
    })
}