const defaultOptions = {
    behavior: 'smooth',
    init: {
        paginationSelector: null,
        paginationItemClass: null
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
    function isElementInViewport (element) {
        const rect = element.getBoundingClientRect()
        const sliderRect = selector.getBoundingClientRect()

        return (
            rect.left >= sliderRect.left &&
            rect.right <= sliderRect.right
        )
    }

    const itemsCount = selector.clientWidth > selector.children[0].clientWidth
        ? [...selector.children].reduce((item, children) =>
            (selector.scrollWidth - selector.clientWidth > item.itemsWidth + children.clientWidth / 2)
                ? { itemsWidth: item.itemsWidth + children.clientWidth, count: item.count + 1 }
                : item, { itemsWidth: 0, count: 0 }).count + 1
        : Math.ceil((selector.scrollWidth) / selector.children[0].clientWidth)

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
    }, { passive: true })
}
