import { dialogSelector } from 'winduum/src/components/dialog/index.js'
import { delegateController } from './Stimulus.js'
import Swup from 'swup'
import initAfter from '../Utils/initAfter.js'

const LibSwup = new Swup({
    containers: ['.l-main', '.l-header'].filter(element => document.querySelector(element)),
    ignoreVisit: (url, { el }) => el?.closest('[data-no-swup], [data-naja]'),
    animationSelector: '.swup-transition'
})

LibSwup.hooks.on('animation:out:start', async () => {
    document.body.classList.remove('overflow-hidden')

    delegateController('c-drawer', 'close')
    delegateController('lib-dialog', 'close', {
        currentTarget: dialogSelector('.c-dialog')
    }, 'body')
})

LibSwup.hooks.before('scroll:top', (visit, { options }) => {
    if (visit.from.url !== visit.to.url) (options.behavior = 'instant')
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

    content.querySelectorAll('[data-lib-replace-tag]').forEach((element) => {
        const replaceTag = document.querySelector(`[data-lib-replace-tag="${element.dataset.libReplaceTag}"]`)
        const placement = element.closest('head') ? document.head : replaceTag.parentElement

        replaceTag ? (replaceTag.outerHTML = element.outerHTML) : placement.insertAdjacentHTML('beforeend', element.outerHTML)
    })

    LibSwup.options.containers.forEach((selector) => {
        initAfter(document.querySelector(selector))
    })

    window.dataLayer && window.dataLayer.push({
        event: 'page_view'
    })

    window.rc?.retargetingHit && window.rc.retargetingHit(window.retargetingConf ?? {})
    window.rc?.conversionHit && window.rc.conversionHit(window.conversionConf ?? {})

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

    if (!noSwup) return

    if (noSwup.classList.contains('ui-btn')) {
        noSwup.classList.add('loading')
    } else {
        noSwup.classList.add('cursor-wait')
    }
})

export default LibSwup
