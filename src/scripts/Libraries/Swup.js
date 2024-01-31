import { closeDialog } from 'winduum/src/components/dialog.js'
import { hideTippy } from './Tippy.js'
import { getController, loadStimulus } from './Stimulus.js'
import LibCookieConsent from './CookieConsent.js'
import { replaceTag, replaceScript } from '../Utils/Functions/+.js'

const Swup = (await import('swup')).default

const LibSwup = new Swup({
    containers: ['#l-main', '#l-header'].filter(element => document.querySelector(element)),
    ignoreVisit: (url, { el }) => el?.closest('[data-no-swup], [data-naja], a[href^="#"]')
})

LibSwup.hooks.on('link:click', async (visit, { event }) => {
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

    if (window.location.href === event.target.closest('a').href) {
        document.documentElement.scroll({ top: 0, behavior: 'smooth' })
    }
})

LibSwup.hooks.on('scroll:anchor', () => {
    document.documentElement.scroll({ top: document.querySelector(`${window.location.hash}`)?.getBoundingClientRect().top, behavior: 'smooth' })
})

/** @var {Array} dataLayer */
/** @var {Function} rc */
/** @var {Function} retargetingHit */
/** @var {Function} conversionHit */
/** @var {Object} retargetingConf */
/** @var {Object} conversionConf */
/** @var {Function} fbq */
LibSwup.hooks.on('content:replace', (visit, { page }) => {
    const content = new DOMParser().parseFromString(page.html, 'text/html')

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

LibSwup.hooks.on('cache:set', (visit, { page }) => {
    LibSwup.cache.update(page.url, { created: Date.now(), ttl: 1000 * 60 })
})

LibSwup.hooks.before('page:load', () => {
    // noinspection JSCheckFunctionSignatures
    LibSwup.cache.prune((url, { created, ttl }) => Date.now() > created + ttl)
})

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

export default LibSwup
