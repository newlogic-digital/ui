import Swup from 'swup'
import { getController, loadStimulus } from './Stimulus.js'
import LibAnchor from './Anchor.js'
import LibDialog from './Dialog.js'
import LibCookieConsent from './CookieConsent.js'

const LibSwup = new Swup({
    containers: ['#l-main', '#l-header'].filter(element => document.querySelector(element)),
    linkSelector: `:is(a[href^="${window.location.origin}"], a[href^="/"]):not([data-no-swup], [data-naja], [target="_blank"])`
})

LibSwup.on('clickLink', async() => {
    document.body.classList.remove('overflow-hidden')

    if (document.querySelector('.lib-drawer[data-state~="active"]') !== null) {
        getController(document.body, 'lib-drawer').hide()
    }

    if (document.querySelector('.lib-dialog') !== null) {
        await LibDialog.hide()
    }
})

LibSwup.on('animationOutDone', () => {
    document.documentElement.scroll({ top: 0, behavior: 'instant' })
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

    LibAnchor.init()

    LibSwup.options.containers.forEach(selector => {
        loadStimulus(document.querySelector(selector))
    })

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
