import { LibStimulus, Controller } from './Stimulus.js'

LibStimulus.register('lib-drawer', class LibDrawer extends Controller {
    connect () {
        setTimeout(() => this.element.classList.add('is-transition'), 50)
        this.element.addEventListener('click', ({ target }) => {
            if (target === this.element) {
                this.hide()
            }
        })
    }

    show () {
        this.element.scrollLeft = 0
        this.element.style.setProperty('--lib-drawer-opacity', '1')
        this.element.classList.add('is-opacity', 'active')
        this.element.setAttribute('aria-hidden', 'false')
        this.element.removeAttribute('inert')
        document.documentElement.classList.add('overflow-hidden')
    }

    hide () {
        this.element.setAttribute('inert', '')
        this.element.setAttribute('aria-hidden', 'true')
        this.element.classList.remove('active')
        this.element.classList.add('is-opacity')
        this.element.style.setProperty('--lib-drawer-opacity', '0')
        document.documentElement.classList.remove('overflow-hidden')
    }

    scroll ({ target }) {
        if (target.scrollLeft > 1) {
            this.element.classList.remove('is-opacity')
            this.element.style.setProperty('--lib-drawer-opacity', `${Math.abs((target.scrollLeft / this.element.children[0].clientWidth) - 1)}`)
        }

        if (target.scrollLeft === this.element.children[0].clientWidth) {
            this.element.classList.remove('active')
            document.documentElement.classList.remove('overflow-hidden')
        }
    }
})
