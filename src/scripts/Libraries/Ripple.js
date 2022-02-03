const LibRipple = ({ currentTarget, layerX, layerY }) => {
    const container = currentTarget

    if (container.querySelector('.lib-ripple') === null) {
        container.insertAdjacentHTML('beforeend', "<div class='lib-ripple'></div>")
    }

    const ink = container.querySelector('.lib-ripple')

    ink.classList.remove('animation')

    if (ink.clientWidth === 0 && ink.clientHeight === 0) {
        const d = Math.max(container.offsetWidth, container.offsetHeight)

        ink.style.width = d + 'px'
        ink.style.height = d + 'px'
    }

    ink.style.top = layerY - (ink.clientHeight / 2) + 'px'
    ink.style.left = layerX - (ink.clientWidth / 2) + 'px'
    ink.classList.add('animation')
}

export default LibRipple
