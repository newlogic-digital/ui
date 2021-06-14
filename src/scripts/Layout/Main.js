import {LibStimulus, Controller, loadStimulus} from "../Libraries/Stimulus.js"
import {bodyLoaded, importScript} from "../Utils/Functions/+.js"
import LibRipple from "../Libraries/Ripple.js"
import LibAnchor from "../Libraries/Anchor.js"
import LibDialog from "../Libraries/Dialog.js"
import LibTippy from "../Libraries/Tippy.js"
import LibTabs from "../Libraries/Tabs.js"
import LibNativeSlider from "../Libraries/NativeSlider.js"
import cdn from "../Utils/cdn.js"

LibStimulus.register("lib", class extends Controller {
    ripple(e) {
        LibRipple(e.currentTarget, e)
    }

    anchor(e) {
        e.preventDefault();
        LibAnchor.action(e.currentTarget)
    }

    darkMode(e) {
        let currentTarget = e.currentTarget

        if (document.documentElement.classList.contains('dark')) {
            localStorage.theme = 'light'
            document.documentElement.classList.remove('dark')
            currentTarget.classList.remove("icon-light")
        } else {
            localStorage.theme = 'dark';
            document.documentElement.classList.add('dark')
            currentTarget.classList.add("icon-light")
        }
    }
});

LibStimulus.register("lib-dialog", class extends Controller {
    connect() {
        let element = this.element;

        if (typeof element.dataset.libDialogOpen !== "undefined") {
            let url = element.getAttribute("data-action-url")

            if (url) {
                LibDialog.action(element, url, () => loadStimulus(document.querySelector(".lib-dialog")))
            } else {
                LibDialog.show(document.querySelector(element.dataset.libDialogOpen).innerHTML, () => loadStimulus(document.querySelector(".lib-dialog")))
            }
        }
    }

    show(e) {
        let element = e.currentTarget
        let url = element.getAttribute("data-action-url")

        LibDialog.action(element, url, () => loadStimulus(document.querySelector(".lib-dialog")))
    }

    hide() {
        LibDialog.hide()
    }
})

LibStimulus.register("lib-tabs", class extends Controller {
    connect() {
        LibTabs(this.element);
    }
})

LibStimulus.register("lib-ns", class extends Controller {
    connect() {
        if (!('scrollBehavior' in document.documentElement.style)) {
            importScript(cdn.seamless).then(() => window.seamless.polyfill())
        }

        bodyLoaded(() => LibNativeSlider(this.element.querySelector("[data-lib-ns]"), this.element))
    }
})

LibStimulus.register("lib-tippy", class extends Controller {
    connect() {
        let attributes = this.element.getAttribute("data-lib-tippy")

        new LibTippy(this.element, attributes !== null ? attributes.replace(/\s/g,"").split(",") : undefined)
    }
})