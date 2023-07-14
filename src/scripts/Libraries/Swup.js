import Swup from 'swup'
import { closeDialog } from 'winduum/src/libraries/dialog.js'
import { hideTippy } from './Tippy.js'
import { getController, loadStimulus } from './Stimulus.js'
import LibCookieConsent from './CookieConsent.js'
import { replaceTag, replaceScript } from '../Utils/Functions/+.js'

document.addEventListener('click', ({ target }) => {
    const noSwup = target.closest('[data-no-swup]')

    if (!noSwup) {
        return
    }

    if (noSwup.classList.contains('ui-btn')) {
        noSwup.classList.add('loading')
    } else {
        noSwup.classList.add('cursor-wait')
    }
})

const LibSwup = new Swup({
    containers: ['#l-main', '#l-header'].filter(element => document.querySelector(element)),
    linkSelector: `:is(a[href^="${window.location.origin}"], a[href^="/"]):not([data-no-swup], [data-naja], [target="_blank"])`
})

LibSwup.on('clickLink', async ({ target }) => {
    document.body.classList.remove('overflow-hidden')

    const LibDrawerSelector = document.querySelector('.lib-drawer.active')
    const LibDialogSelector = document.querySelector('.lib-dialog')

    hideTippy()

    if (LibDrawerSelector) {
        /** @type {LibDrawer} */
        const LibDrawer = getController(LibDrawerSelector, 'lib-drawer')

        LibDrawer.hide()
    }

    if (LibDialogSelector) {
        await closeDialog(LibDialogSelector)
    }

    if (window.location.href === target.closest('a').href) {
        document.documentElement.scroll({ top: 0, behavior: 'smooth' })
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

    if (window.location.hash) {
        document.documentElement.scroll({ top: document.querySelector(`${window.location.hash}`)?.offsetTop, behavior: 'smooth' })
    }

    LibCookieConsent.init()

    LibSwup.options.containers.forEach(selector => {
        loadStimulus(document.querySelector(selector))
        replaceScript(document.querySelector(selector))
    })

    window.dataLayer && window.dataLayer.push({
        event: 'page_view'
    })

    window.rc?.retargetingHit && window.rc.retargetingHit(window.retargetingConf)
    window.rc?.conversionHit && window.rc.conversionHit(window.conversionConf)

    window.fbq && window.fbq('track', 'PageView')
})

LibSwup.options.cache && setInterval(() => {
    LibSwup.cache.empty()
}, 90 * 1000)

export default LibSwup
