import { LibStimulus, Controller, loadStimulus } from '../Libraries/Stimulus.js'
import { importScript } from '../Utils/Functions/+.js'
import LibRipple from '../Libraries/Ripple.js'
import LibAnchor from '../Libraries/Anchor.js'
import LibDialog from '../Libraries/Dialog.js'
import LibTippy from '../Libraries/Tippy.js'
import LibTabs from '../Libraries/Tabs.js'
import LibNativeSlider from '../Libraries/NativeSlider.js'
import cdn from '../Utils/cdn.js'

LibStimulus.register('lib', class extends Controller {
    connect() {
        if (!('scrollBehavior' in document.documentElement.style)) {
            importScript(cdn.seamless).then(() => window.seamless.polyfill())
        }
    }

    ripple(e) {
        LibRipple(e)
    }

    anchor(e) {
        e.preventDefault()
        LibAnchor.action(e.currentTarget)
    }

    darkMode() {
        if (document.documentElement.classList.contains('dark')) {
            localStorage.theme = 'light'
            document.documentElement.classList.remove('dark')
        } else {
            localStorage.theme = 'dark'
            document.documentElement.classList.add('dark')
        }
    }
})

LibStimulus.register('lib-dialog', class extends Controller {
    async connect() {
        if (this.element.getAttribute('data-lib-dialog-open')) {
            const url = this.element.getAttribute('data-action-url')

            if (url) {
                await LibDialog.action(this.element, url, () => loadStimulus(document.querySelector('.lib-dialog')))
            } else {
                await LibDialog.show(document.querySelector(this.element.getAttribute('data-lib-dialog-open')).innerHTML, () => loadStimulus(document.querySelector('.lib-dialog')))
            }
        }
    }

    async show({ currentTarget }) {
        const url = currentTarget.getAttribute('data-action-url')

        await LibDialog.action(currentTarget, url)
    }

    async hide() {
        await LibDialog.hide()
    }
})

LibStimulus.register('lib-tabs', class extends Controller {
    connect() {
        LibTabs(this.element)
    }
})

LibStimulus.register('lib-ns', class extends Controller {
    connect() {
        LibNativeSlider(this.element.querySelector('[data-lib-ns]'), this.element)
    }
})

LibStimulus.register('lib-tippy', class extends Controller {
    connect() {
        const attributes = this.element.getAttribute('data-lib-tippy')

        new LibTippy(this.element, attributes !== null ? attributes.replace(/\s/g, '').split(',') : undefined)
    }
})
