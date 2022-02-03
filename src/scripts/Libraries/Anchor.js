const LibAnchor = {
    animation: (element) => {
        const offset = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('scroll-padding-top'))

        document.documentElement.scroll({ top: element.offsetTop - offset, behavior: 'smooth' })
    },
    action: (element) => {
        const href = element.href ? element.getAttribute('href') : element.getAttribute('data-action-href')
        const data = element.dataset.libAnhor ? element.dataset.libAnhor : ''
        const target = document.querySelector(`[id="${href.replace('#', '')}"]`)

        if (target !== null) {
            if (!(data.includes('mobile') && window.innerWidth > 960)) {
                LibAnchor.animation(target)
            }

            if (!data.includes('silent')) {
                window.location.hash = target.id
            }
        }
    },
    init: () => {
        const selector = document.querySelectorAll('[id]')

        if (selector[0] !== null) {
            selector.forEach(element => {
                if (window.location.hash && element.getAttribute('id') === window.location.hash.replace('#', '')) {
                    LibAnchor.animation(element)
                }
            })
        }
    }
}

export default LibAnchor
