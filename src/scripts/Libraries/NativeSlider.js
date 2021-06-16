export default function LibNativeSlider(selector, parent) {
    const self = {
        behavior: 'auto',
        ref: {
            nav: parent.querySelector('[data-lib-ns-nav]'),
            select: parent.querySelectorAll('[data-lib-ns-nav-item]'),
            progress: parent.querySelector('[data-lib-ns-progress]'),
            counterMin: parent.querySelector('[data-lib-ns-counter="min"]'),
            counterMax: parent.querySelector('[data-lib-ns-counter="max"]'),
            prev: parent.querySelector('[data-lib-ns-prev]'),
            next: parent.querySelector('[data-lib-ns-next]')
        }
    }

    if (!selector.classList.contains('is-fade')) {
        self.behavior = 'smooth'

        const grabbing = () => {
            self.isDown = false
            self.paused = false
            selector.classList.remove('is-grabbing')
            selector.scrollLeft = selector.scrollLeft - 1
        }

        selector.addEventListener('mouseleave', grabbing)

        selector.addEventListener('mouseup', grabbing)

        selector.addEventListener('mousedown', e => {
            self.isDown = true
            self.startX = e.pageX - selector.offsetLeft
            self.scrollLeft = selector.scrollLeft
            self.paused = true
        })

        selector.addEventListener('mousemove', e => {
            if (!self.isDown) return
            e.preventDefault()
            const x = e.pageX - selector.offsetLeft
            const walk = (x - self.startX) * 1.25
            selector.classList.add('is-grabbing')
            selector.scrollLeft = self.scrollLeft - walk

            selector.ondragstart = dragEvent => {
                dragEvent.preventDefault()
            }
        })
    }

    if (self.ref.counterMax !== null) {
        self.counterMax = parseInt(((selector.scrollWidth - selector.clientWidth) / selector.children[0].clientWidth + 1).toFixed(0))
        self.ref.counterMax.textContent = self.counterMax
    }

    if (self.ref.nav !== null) {
        self.ref.nav.insertAdjacentHTML('beforeend', [...Array(self.counterMax)].map((x, i) => `<div data-state="${i === 0 && 'active'}" aria-label="${i + 1}" aria-current="step" data-lib-ns-nav-item="${i}"></div>`).join(''))
        self.ref.select = parent.querySelectorAll('[data-lib-ns-nav-item]')
    }

    if (typeof self.ref.select[0] !== 'undefined') {
        self.ref.select.forEach(elm => {
            elm.addEventListener('click', () => {
                if (!elm._hasDataValue('state', 'active')) {
                    const position = selector.scrollLeft / selector.children[0].clientWidth
                    const selected = elm.dataset.libNsNavItem

                    if (position - selected <= 0) {
                        selector.scroll({ left: selector.scrollLeft + selector.children[0].clientWidth * (selected - position), behavior: self.behavior })
                    } else {
                        selector.scroll({ left: selector.scrollLeft - selector.children[0].clientWidth * (position - selected), behavior: self.behavior })
                    }
                }
            })
        })
    }

    selector.addEventListener('scroll', () => {
        if (self.ref.progress !== null) {
            self.ref.progress.value = ((selector.scrollLeft + selector.clientWidth) / selector.scrollWidth * 100).toFixed(2)
        }

        const activeSlide = parseInt(((selector.scrollLeft / selector.children[0].clientWidth) + 1).toFixed(0))

        if (self.ref.counterMin !== null) {
            self.ref.counterMin.textContent = activeSlide
        }

        if (typeof self.ref.select[0] !== 'undefined') {
            self.ref.select.forEach(elm => elm._removeDataValue('state', 'active'))

            self.ref.select[activeSlide - 1]._addDataValue('state', 'active')
        }

        if (Math.floor(selector.scrollLeft / selector.children[0].clientWidth) === selector.scrollLeft / selector.children[0].clientWidth) {
            [...selector.children].forEach(elm => {
                elm._removeDataValue('state', 'active')

                if (selector.scrollLeft === elm.offsetLeft - elm.parentNode.offsetLeft) {
                    elm._addDataValue('state', 'active')
                }
            })
        }
    }, { passive: true })

    if (self.ref.progress !== null) {
        self.ref.progress.addEventListener('click', e => {
            selector.scrollLeft = (selector.scrollWidth / 100) * (e.clientX - e.target.offsetLeft) / e.target.clientWidth * 100
        })
    }

    if (self.ref.prev !== null && self.ref.next !== null) {
        self.ref.prev.addEventListener('click', () => selector.scroll({ left: selector.scrollLeft - selector.children[0].clientWidth, behavior: self.behavior }))

        self.ref.next.addEventListener('click', () => selector.scroll({ left: selector.scrollLeft + selector.children[0].clientWidth, behavior: self.behavior }))
    }

    [self.ref.prev, self.ref.next, ...self.ref.select, self.ref.progress].forEach(elm => {
        if (typeof elm !== 'undefined' && elm !== null) {
            elm.addEventListener('mouseenter', () => (self.paused = true))
            elm.addEventListener('mouseleave', () => (self.paused = false))
        }
    })

    if (!isNaN(parseInt(selector.getAttribute('data-lib-ns')))) {
        setInterval(() => {
            if (!self.paused) {
                if (selector.scrollLeft <= selector.children[0].clientWidth) {
                    selector.scroll({ left: selector.scrollLeft + selector.children[0].clientWidth, behavior: self.behavior })
                } else {
                    selector.scroll({ left: 0, behavior: self.behavior })
                }
            }
        }, parseInt(selector.getAttribute('data-lib-ns')))
    }
}
