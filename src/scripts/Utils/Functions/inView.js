export default function inView(element, options = {}) {
    let inView = false

    return new Promise((resolve) => {
        if (typeof IntersectionObserver === 'undefined') {
            resolve()
            return false
        }

        if (!options.rootMargin) {
            options.rootMargin = '100px'
        }

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && inView === false) {
                inView = entries[0].isIntersecting
                observer.disconnect()
                resolve()
            }
        }, options || {})

        observer.observe(element)
    })
}
