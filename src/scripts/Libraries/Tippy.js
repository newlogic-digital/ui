import {loadStimulus} from "../Utils/Functions/+.js";

export default class LibTippy {
    options = {
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
            // let name = attributes[1];
            //
            // if (typeof name === "undefined") {
            //     name = attributes[0];
            // }

            instance.popper.querySelector(".tippy-box").setAttribute("data-name", "asd");

            loadStimulus(instance.popper.querySelector(".tippy-content"));

            // if (onShow) {
            //     onShow(instance);
            // }
        },
        onHide(instance) {
            // if (onHide) {
            //     onHide(instance);
            // }
        }
    };
    async init(element, options, template) {
        const tippy = (await import("tippy.js")).default;
        const {roundArrow} = await import("tippy.js");

        if (typeof element._tippy !== "undefined") {
            return false;
        }

        if (this.type.includes("arrow")) {
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
    }
    create(element, attributes = ["tooltip", ""]) {
        const self = this;

        this.type = attributes[0];
        this.template = attributes[1];

        if (this.type.includes("dropdown")) {
            this.options.trigger = "click"
            this.options.placement = "bottom-end"
            this.options.arrow = false
        }
        this.options.showOnCreate = true;

        console.log(this.options);

        this.options.trigger.split(" ").map(event => {
            element.addEventListener(event, function e() {
                if (self.template.startsWith("/") && self.options.content === "") {
                    element.style.cursor = "wait";

                    fetch(self.template, {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then(response => {
                        return response.json();
                    }).then(async (data) => {
                        self.options.content = data["dialog"];
                        element.style.cursor = "";
                        await self.init(element, self.options, self.template);
                        element.removeEventListener(event, e);
                    })
                } else {
                    self.init(element, self.options, self.template);
                    element.removeEventListener(event, e);
                }
            })
        })
    }
}

export default function LibTippyOld(element, attributes = ["tooltip", ""], onShow, onHide) {
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