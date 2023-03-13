import Swup from 'swup'
import { getController, loadStimulus } from './Stimulus.js'
import { closeDialog } from 'winduum/src/libraries/dialog.js'
import LibAnchor from './Anchor.js'
import LibCookieConsent from './CookieConsent.js'
import replaceTag from '../Utils/Functions/replaceTag.js'

const LibSwup = new Swup({
    containers: ['#l-main', '#l-header'].filter(element => document.querySelector(element)),
    linkSelector: `:is(a[href^="${window.location.origin}"], a[href^="/"]):not([data-no-swup], [data-naja], [target="_blank"])`
})

LibSwup.on('clickLink', async({ target }) => {
    document.body.classList.remove('overflow-hidden')

    if (document.querySelector('.lib-drawer[data-state~="active"]') !== null) {
        /** @type {LibDrawer} */
        const LibDrawer = getController(document.body, 'lib-drawer')
        LibDrawer.hide()
    }

    if (document.querySelector('.lib-dialog') !== null) {
        await closeDialog()
    }

    if (window.location.href === target.closest('a').href) {
        document.documentElement.scroll({ top: 0 })
    }
})

LibSwup.on('animationOutDone', () => {
    document.documentElement.scroll({ top: 0, behavior: 'instant' })
})

/** @var {Array} dataLayer */
/** @var {Function} rc */
/** @var {Function} retargetingHit */
/** @var {Function} conversionHit */
/** @var {Object} retargetingConf */
/** @var {Object} conversionConf */
/** @var {Function} fbq */
LibSwup.on('contentReplaced', () => {
    const content = new DOMParser().parseFromString(LibSwup.cache.getCurrentPage().originalContent, 'text/html')

    replaceTag(content)

    LibAnchor.init()
    LibCookieConsent.init()

    LibSwup.options.containers.forEach(selector => {
        loadStimulus(document.querySelector(selector))
    })

    window.dataLayer && window.dataLayer.push({
        event: 'page_view'
    })

    window.rc?.retargetingHit && window.rc.retargetingHit(window.retargetingConf)
    window.rc?.conversionHit && window.rc.conversionHit(window.conversionConf)

    window.fbq && window.fbq('track', 'PageView')
})

export default LibSwup
