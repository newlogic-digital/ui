const LibAnchor = {
    animation: (element) => {
        let offset
        let attr = "data-offset"

        if (window.innerWidth > 960) {
            offset = 0

            if (element.getAttribute(attr) !== null) {
                if (isNaN(parseInt(element.getAttribute(attr)))) {
                    offset = document.querySelector(element.getAttribute(attr)).offsetHeight
                } else {
                    offset = parseInt(element.getAttribute(attr))
                }
            }
        }

        document.documentElement.scroll({top: element.offsetTop - offset, behavior: "smooth"})
    },
    action: (element) => {
        let href = element.getAttribute("href")

        if (href === null) {
            href = element.getAttribute("data-action-href")
        }

        let id = document.querySelector("[id=" + href.replace('#', '') + "]")
        let options = element.getAttribute("data-action-options")

        if (options === null) {
            options = ""
        }

        if (id !== null) {
            if (!(options.indexOf("mobile") > -1 && window.innerWidth > 960)) {

                LibAnchor.animation(id)

                if (options.indexOf("hash") > -1) {
                    window.location.hash = id
                }
            }
        }
    },
    init: () => {
        let selector = [...document.querySelectorAll("[id]")]

        if (selector[0] !== null) {
            selector.forEach((element) => {
                if (window.location.hash && element.getAttribute("id") === window.location.hash.replace('#', '')) {
                    LibAnchor.animation(element)
                }
            });
        }
    }
}

LibAnchor.init()

export default LibAnchor