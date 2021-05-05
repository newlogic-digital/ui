import cdn from "../Utils/cdn.js";
import {LibStimulus, Controller} from "../Libraries/Stimulus.js";
import {importStyle} from "../Utils/Functions/+.js";

LibStimulus.register("ui-input", class extends Controller {
    connect() {
        let element = this.element;

        this.validateInput(element, false);

        element.addEventListener("change", () => {
            this.validateInput(element, true);
        });

        this.typeNumber(element);

        this.typeTime(element);

        this.typeDatetime(element);

        this.typeColor(element);

        this.typeFile(element);
    }

    validateInput(element, validate) {
        let input = element.querySelectorAll("input, textarea");

        [...input].map((input) => {
            if (input.outerHTML.match(/(data-novalidate|readonly|hidden|data-state="invalid")/) === null && validate) {
                element.removeAttribute("data-state");

                if (input.checkValidity()) {
                    element._addDataValue("state", "valid");
                } else {
                    element._addDataValue("state", "invalid");
                }
            }

            if (input.value !== "") {
                element._addDataValue("state", "active");
            }
        })
    }

    typeNumber(element) {
        if (element.querySelector(`[type="number"]`) !== null) {
            if (element.querySelector(".icon") === null) {
                element.insertAdjacentHTML("beforeend", `<span class="icon icon-angle-down" data-action="minus"></span><span class="icon icon-angle-up" data-action="plus"></span>`);
            }

            element.querySelector(`[type="number"]`).addEventListener("keydown", (e) => {
                if ([46, 8, 9, 27, 13, 190].indexOf(e.keyCode) !== -1 || e.keyCode === 16 || (e.keyCode === 65 && e.ctrlKey === true) || (e.keyCode >= 35 && e.keyCode <= 39)) {
                    return;
                }

                if (((e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }
            });

            element.querySelector(`[data-action="plus"]`).addEventListener("click", () => {
                let input = this.element.querySelector("input"),
                    num = parseInt(input.value) + parseInt(input.getAttribute('data-step'));

                if (num <= input.getAttribute('max')) {
                    input.value = num;
                    input.dispatchEvent(new Event('change', { 'bubbles': true }));
                }
            });

            element.querySelector(`[data-action="minus"]`).addEventListener("click", () => {
                let input = this.element.querySelector("input"),
                    num = parseInt(input.value) - parseInt(input.getAttribute('data-step'));

                if (num >= input.getAttribute('min')) {
                    input.value = num;
                    input.dispatchEvent(new Event('change', { 'bubbles': true }));
                }
            });
        }
    }

    async typeDatetime(element) {
        let date = element.querySelector(`[type^="date"]`);

        if (date !== null && !document.documentElement.classList.contains("mobile")) {
            const lang = await import(`/* @vite-ignore */https://cdn.esm.sh/v41/vanillajs-datepicker/locales/${document.documentElement.lang === "en" ? "cs" : document.documentElement.lang}.js`);
            const { Datepicker } = await import("vanillajs-datepicker");

            Object.assign(Datepicker.locales, lang.default)

            let datetime = date.getAttribute("type") === "datetime-local";
            let required = date.getAttribute("required") !== null;
            let placeholder = date.getAttribute("placeholder") !== null;
            let currentDate, currentTime = null;

            date.setAttribute("type", "hidden");
            element.insertAdjacentHTML("beforeend", `<input type="text" inputmode="none" ${required ? 'required': ''} ${placeholder ? 'placeholder': ''}>`);
            element.querySelector(`[type="text"]`).addEventListener("keydown", (e) => e.preventDefault());

            let hidden = element.querySelector(`[type="hidden"]`);

            if (datetime && hidden.value.indexOf(":") !== -1) {
                hidden.setAttribute("data-time", hidden.value.substr(hidden.value.indexOf(":") - 2, hidden.value.length))
            }

            let datepicker = new Datepicker(element.querySelector(`[type="text"]`), Object.assign({
                autohide: true,
                language: document.documentElement.lang,
                minDate: Datepicker.parseDate(hidden.getAttribute("min"),"yyyy-mm-dd"),
                maxDate: Datepicker.parseDate(hidden.getAttribute("max"),"yyyy-mm-dd")
            }, JSON.parse(element.getAttribute("data-lib-datepicker"))));

            datepicker.setDate(Datepicker.parseDate(hidden.value,"yyyy-mm-dd"));

            if (datetime && hidden.value) {
                element.insertAdjacentHTML("afterbegin", `<span class="input" ${placeholder ? 'placeholder': ''}>${datepicker.getDate("dd.mm.yyyy") + " " + hidden.dataset.time}</span>`);
            }

            datepicker.element.addEventListener("changeDate", () => {
                if (typeof hidden.dataset.time !== "undefined") {
                    hidden.value = datepicker.getDate("yyyy-mm-dd") + "T" + hidden.dataset.time;

                    let value = datepicker.getDate("dd.mm.yyyy") + " " + hidden.dataset.time;

                    if (element.querySelector('.input') === null) {
                        element.insertAdjacentHTML("afterbegin", `<span class="input" ${placeholder ? 'placeholder': ''}>${value}</span>`);
                    } else {
                        element.querySelector('.input').textContent = value;
                    }
                } else {
                    hidden.value = datepicker.getDate("yyyy-mm-dd");
                }

                hidden.dispatchEvent(new Event('change', { 'bubbles': true }));
            });

            datepicker.element.addEventListener("show", (element) => {
                let footer = element.detail.datepicker.picker.element.querySelector(".datepicker-footer");
                currentDate = datepicker.getDate("yyyy-mm-dd");

                    this.element._addDataValue("state", "active");

                if (footer.querySelector('[type="time"]') === null && datetime) {
                    let time = hidden.dataset.time;

                    if (typeof time === "undefined") {
                        time = new Date().toLocaleTimeString("de", {hour: "2-digit", minute: "2-digit"});
                        hidden.setAttribute("data-time", time);
                    }

                    currentTime = time;

                    footer.insertAdjacentHTML("beforeend", `<div class="datepicker-time"><input type="time" value="${time}" aria-label="Text"></div>`);

                    this.typeTime(footer);

                    footer.querySelector(`[type="time"]`).addEventListener("change", (e) => {
                        hidden.setAttribute("data-time", e.target.value);
                    });

                    footer.querySelector(`[type="time"]`).addEventListener("click", (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        e.target.focus();
                    });
                } else if (datetime) {
                    currentTime = hidden.dataset.time;
                }
            });

            datepicker.element.addEventListener("hide", (element) => {

                    if (hidden.value === "") {
                        this.element._removeDataValue("state", "active");
                    }

                if (datetime) {
                    element.detail.datepicker.picker.element.querySelector(`[type="time"]`).dispatchEvent(new Event('change', { 'bubbles': true }));

                    if (currentDate === datepicker.getDate("yyyy-mm-dd") && currentTime.toString() !== hidden.dataset.time.toString()) {
                        datepicker.element.dispatchEvent(new Event('changeDate', { 'bubbles': true }));
                    }
                }
            });
        }
    }

    async typeTime(element) {
        if (element.querySelector(`[type="time"]`) !== null && element.querySelector(`[type="time"]`).type !== "time") {
            const Cleave = (await import("cleave.js")).default;

            element.querySelector('[type="time"]').setAttribute("placeholder", "--:--");
            element.querySelector('[type="time"]').classList.add("polyfill");

            if (element.querySelector("label") !== null) {
                element.querySelector('[type="time"]').classList.add("is-label");
            }

            new Cleave(element.querySelector('[type="time"]'), {
                time: true,
                timePattern: ['h', 'm']
            });
        }
    }

    async typeColor(element) {
        if (element.querySelector(`[type="color"]`) !== null) {
            element.setAttribute("data-type", "color");
            element.querySelector(`[type="color"]`).setAttribute("inputmode", "none");
            element.querySelector(`[type="color"]`).setAttribute("type", "text");
            element.insertAdjacentHTML("afterbegin", `<span class="color"></span>`);

            importStyle(cdn.pickr_css);

            let Pickr = (await import("@simonwep/pickr")).default;

            if (typeof Pickr.default !== "undefined") {
                Pickr = Pickr.default
            }

            let input = element.querySelector("input");
            input.setAttribute("maxlength", "9");
            input.setAttribute("pattern", "^#?([a-fA-F0-9]{8}|[a-fA-F0-9]{6}|[a-fA-F0-9]{3})$");

            const pickr = new Pickr({
                el: input,
                useAsButton: true,
                theme: 'nano',
                position: 'bottom-start',
                components: {
                    preview: true,
                    opacity: true,
                    hue: true,
                    interaction: {
                        hex: true,
                        rgba: true,
                        input: true
                    }
                }
            }).on('init', pickr => {
                pickr.setColor(input.value);
            }).on('change', color => {
                input.value = color.toHEXA().toString();
                element.querySelector(".color").style["background-color"] = color.toHEXA().toString();
            }).on('hide', pickr => {
                pickr.applyColor();
                input.dispatchEvent(new Event('change', { 'bubbles': true }));
            })

            input.addEventListener("change", (e) => {
                pickr.setColor(e.target.value);
            })

        }
    }

    typeFile(element) {
        if (element.querySelector(`[type="file"]`) !== null) {
            element.setAttribute("data-type", "file");
            element.insertAdjacentHTML("beforeend", `<span class="icon icon-paper-clip">${element.querySelector("input").title}</span><span data-placeholder="${element.querySelector("input").placeholder}"></span>`);
            element.querySelector("input").addEventListener("change", (e) => {
                let placeholder = element.querySelector("span:not(.icon)");

                if (e.target.getAttribute("multiple") === null) {
                    placeholder.removeAttribute("data-placeholder");
                    placeholder.textContent = e.target.value.replace(/.*(\/|\\)/, '');
                } else {
                    let files = e.target.files;
                    placeholder.removeAttribute("data-placeholder");
                    placeholder.textContent = `${Object.keys(files).length} soubory`;

                }
            });
        }
    }
});