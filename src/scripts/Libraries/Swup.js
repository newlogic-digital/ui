import Swup from 'swup'
import { LibStimulus, loadStimulus } from './Stimulus.js'
import LibAnchor from './Anchor.js'
import LibDialog from './Dialog.js'
import LibCookieConsent from './CookieConsent.js'

const LibSwup = new Swup({
    containers: ['#l-main'],
    linkSelector: `a[href^="${window.location.origin}"]:not([data-no-swup]):not([target="_blank"]), a[href^="/"]:not([data-no-swup]):not([target="_blank"]), a[href^="#"]:not([data-no-swup])`
})

LibSwup.on('clickLink', () => {
    document.body.classList.remove('is-overflow-hidden')

    if (document.querySelector('.is-lib-drawer-active') !== null) {
        LibStimulus.getController(document.body, 'lib-drawer').hide()
    }

    if (document.querySelector('.lib-dialog') !== null) {
        LibDialog.hide()
    }
})

LibSwup.on('animationOutDone', () => {
    window.scrollTo(0, 0)
})

LibSwup.on('contentReplaced', () => {
    const content = new DOMParser().parseFromString(LibSwup.cache.getCurrentPage().originalContent, 'text/html')

    content.head.querySelectorAll('[data-lib-swup-replace]').forEach(element => {
        const tag = document.querySelector(`[data-lib-swup-replace=${element.dataset.libSwupReplace}]`)

        if (tag !== null) {
            tag.outerHTML = element.outerHTML
        } else {
            document.head.insertAdjacentHTML('beforeend', element.outerHTML)
        }
    })

    LibSwup.options.containers.forEach(selector => {
        loadStimulus(document.querySelector(selector))
    })

    LibAnchor.init()

    if (typeof window.fbq !== 'undefined') {
        window.fbq('track', 'PageView')
    }

    if (typeof gtag !== 'undefined') {
        const configs = []
        window.dataLayer.forEach(function(config) {
            if (config[0] === 'config') {
                if (typeof config[1] !== 'undefined' && !configs.includes(config[1])) {
                    configs.push(config[1])
                    window.gtag('config', config[1], {
                        page_title: document.title,
                        page_path: window.location.pathname + window.location.search
                    })
                }
            }
        })
    }

    if (typeof window.dataLayer !== 'undefined') {
        window.dataLayer.push({
            event: 'VirtualPageview',
            virtualPageURL: window.location.pathname + window.location.search,
            virtualPageTitle: document.title
        })
    }

    if (typeof LibCookieConsent !== 'undefined') {
        LibCookieConsent.init()
    }
})

export default LibSwup
