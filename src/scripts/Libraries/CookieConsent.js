const LibCookieConsent = {
    init: () => {
        const type = localStorage.getItem('lib-cookieconsent')

        if (type !== null) {
            JSON.parse(type).forEach(type => LibCookieConsent.append(type))
        }
    },
    set: (type) => {
        localStorage.setItem('lib-cookieconsent', JSON.stringify(type))
        localStorage.setItem('lib-cookieconsent-expire', (Date.now() + 31556926 * 1000).toString())

        if (type.length > 0) {
            type.forEach(type => LibCookieConsent.append(type))
        } else {
            localStorage.setItem('lib-cookieconsent', JSON.stringify([]))
            LibCookieConsent.remove()
        }
    },
    remove: () => {
        document.cookie.split(';').forEach(c => {
            document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
        })
    },
    append: (type) => {
        document.querySelectorAll('[data-lib-cookieconsent]').forEach(elm => {
            if (type === 'all' || elm.getAttribute('data-lib-cookieconsent') === type) {
                const script = document.createElement('script')
                let delay = 0

                ;[...elm.attributes].forEach((attribute) => {
                    if (attribute.specified) {
                        if (attribute.name.indexOf('data-lib-cookieconsent') === -1 && attribute.name.indexOf('type') === -1) {
                            script.setAttribute(attribute.name, attribute.value)
                        }
                    }
                })

                script.innerHTML = elm.innerHTML

                if (elm.getAttribute('data-lib-cookieconsent-delay')) {
                    delay = parseInt(elm.getAttribute('data-lib-cookieconsent-delay'))
                }

                setTimeout(() => {
                    if (elm.closest('body') !== null) {
                        document.body.appendChild(script)
                    } else if (elm.closest('head') !== null) {
                        document.head.appendChild(script)
                    }

                    elm.remove()
                }, delay)
            }
        })
    }
}

LibCookieConsent.init()

export default LibCookieConsent
