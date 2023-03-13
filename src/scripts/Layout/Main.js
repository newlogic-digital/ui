import { LibStimulus, Controller } from '../Libraries/Stimulus.js'
import { importScript } from '../Utils/Functions/+.js'
import LibRipple from '../Libraries/Ripple.js'
import LibAnchor from '../Libraries/Anchor.js'
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

    anchor({ currentTarget }) {
        arguments[0].preventDefault()
        LibAnchor.action(currentTarget)
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
