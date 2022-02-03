export default function inView(element, options) {
    let inView = false

    return new Promise((resolve) => {
        if (typeof IntersectionObserver === 'undefined') {
            resolve()
            return false
        }

        if (typeof options === 'undefined') {
            options = {}
        }

        if (typeof options.rootMargin === 'undefined') {
            options.rootMargin = '100px'
        }

        new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && inView === false) {
                inView = entries[0].isIntersecting
                resolve()
            }
        }, options).observe(element)
    })
}
