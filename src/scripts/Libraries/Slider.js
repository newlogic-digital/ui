const defaultOptions = {
    behavior: 'smooth',
    init: {
        pauseSelector: [],
        paginationSelector: null,
        paginationItemClass: null,
        progressSelector: null,
        counterMinSelector: null,
        counterMaxSelector: null,
        autoplay: false
    }
}

export const prevSlide = (selector) => {
    selector.scroll({ left: selector.scrollLeft - selector.children[0].clientWidth, behavior: defaultOptions.behavior })
}

export const nextSlide = (selector) => {
    selector.scroll({ left: selector.scrollLeft + selector.children[0].clientWidth, behavior: defaultOptions.behavior })
}

export const selectSlide = (selector, selected = 0) => {
    const position = selector.scrollLeft / selector.children[0].clientWidth

    if (position - selected <= 0) {
        selector.scroll({ left: selector.scrollLeft + selector.children[0].clientWidth * (selected - 1 - position), behavior: defaultOptions.behavior })
    } else {
        selector.scroll({ left: selector.scrollLeft - selector.children[0].clientWidth * (position - selected + 1), behavior: defaultOptions.behavior })
    }
}

export const initSlider = (selector, options = defaultOptions.init) => {
    let isDown; let paused; let startX; let scrollLeft = null

    function isElementInViewport (element) {
        const rect = element.getBoundingClientRect()
        const sliderRect = selector.getBoundingClientRect()

        return (
            rect.left >= sliderRect.left &&
            rect.right <= sliderRect.right
        )
    }

    function setProgressValue () {
        if (options.progressSelector) {
            options.progressSelector.value = ((selector.scrollLeft + selector.clientWidth) / selector.scrollWidth * 100).toFixed(2)
        }
    }

    if (!selector.classList.contains('is-fade')) {
        const grabbing = () => {
            isDown = false
            paused = false
            selector.classList.remove('is-grabbing')
            selector.scrollLeft = selector.scrollLeft - 1
        }

        selector.addEventListener('mouseleave', grabbing)

        selector.addEventListener('mouseup', grabbing)

        selector.addEventListener('mousedown', ({ pageX }) => {
            isDown = true
            paused = true
            startX = pageX - selector.offsetLeft
            scrollLeft = selector.scrollLeft
        })

        selector.addEventListener('mousemove', e => {
            if (!isDown) return
            e.preventDefault()
            const x = e.pageX - selector.offsetLeft
            const walk = (x - startX) * 1.25

            selector.classList.add('is-grabbing')
            selector.scrollLeft = scrollLeft - walk

            selector.ondragstart = dragEvent => dragEvent.preventDefault()
        })
    }

    const itemsCount = selector.clientWidth > selector.children[0].clientWidth
        ? [...selector.children].reduce((item, children) =>
            (selector.scrollWidth - selector.clientWidth > item.itemsWidth + children.clientWidth / 2)
                ? { itemsWidth: item.itemsWidth + children.clientWidth, count: item.count + 1 }
                : item, { itemsWidth: 0, count: 0 }).count + 1
        : Math.ceil((selector.scrollWidth) / selector.children[0].clientWidth)

    if (options.counterMinSelector) {
        options.counterMinSelector.textContent = 1
    }

    if (options.counterMaxSelector) {
        options.counterMaxSelector.textContent = itemsCount
    }

    if (options.paginationSelector) {
        options.paginationSelector.insertAdjacentHTML('beforeend', [...Array(itemsCount)].map((_, i) => `
            <div class="${options.paginationItemClass ?? ''}${i === 0 ? ' active' : ''}"></div>
        `).join(''))

        ;[...options.paginationSelector.children].forEach((children) => {
            children.addEventListener('click', ({ currentTarget }) => {
                selectSlide(selector, [...options.paginationSelector.children].indexOf(currentTarget) + 1)
            })
        })
    }

    setProgressValue()

    selector.addEventListener('scroll', () => {
        const activeSlide = parseInt((selector.scrollLeft / selector.children[0].clientWidth).toFixed(0))

        for (const children of [...selector.children]) {
            if (isElementInViewport(children)) {
                children.classList.add('active')
            } else {
                children.classList.remove('active')
            }
        }

        if (options.paginationSelector) {
            [...options.paginationSelector.children].forEach(children => children.classList.remove('active'))

            options.paginationSelector.children[activeSlide].classList.add('active')
        }

        setProgressValue()

        if (options.counterMinSelector) {
            options.counterMinSelector.textContent = activeSlide + 1
        }
    }, { passive: true })

    if (options.progressSelector) {
        options.progressSelector.addEventListener('click', ({ clientX, target }) => {
            selector.scrollLeft = (selector.scrollWidth / 100) * (clientX - target.offsetLeft) / target.clientWidth * 100
        })
    }

    ;[...options.pauseSelector, options.progressSelector, options.paginationSelector, selector].forEach(element => {
        if (typeof element !== 'undefined' && element !== null) {
            element.addEventListener('mouseenter', () => (paused = true))
            element.addEventListener('mouseleave', () => (paused = false))
        }
    })

    if (options.autoplay && !isNaN(options.autoplay)) {
        setInterval(() => {
            if (!paused) {
                if (selector.scrollLeft < selector.children[0].clientWidth * (selector.children.length - 1)) {
                    selector.scroll({ left: selector.scrollLeft + selector.children[0].clientWidth, behavior: self.behavior })
                } else {
                    selector.scroll({ left: 0, behavior: options.behavior })
                }
            }
        }, options.autoplay)
    }
}
