import { LibStimulus, Controller } from './Stimulus.js'

LibStimulus.register('lib-drawer', class extends Controller {
    static targets = ['nav']

    init() {
        setTimeout(() => this.navTarget.classList.add('is-transition'), 50)
        this.navTarget.addEventListener('click', ({ target }) => {
            if (target === this.navTarget) {
                this.hide()
            }
        })
    }

    show() {
        this.navTarget.scrollLeft = 0
        this.navTarget.style.setProperty('--lib-drawer-opacity', '1')
        this.navTarget.classList.add('is-opacity')
        this.navTarget._addDataValue('state', 'active')
        document.documentElement.classList.add('overflow-hidden')
    }

    hide() {
        this.navTarget._removeDataValue('state', 'active')
        this.navTarget.classList.add('is-opacity')
        this.navTarget.style.setProperty('--lib-drawer-opacity', '0')
        document.documentElement.classList.remove('overflow-hidden')
    }

    scroll({ target }) {
        if (target.scrollLeft > 1) {
            this.navTarget.classList.remove('is-opacity')
            this.navTarget.style.setProperty('--lib-drawer-opacity', `${Math.abs((target.scrollLeft / this.navTarget.children[0].clientWidth) - 1)}`)
        }

        if (target.scrollLeft === this.navTarget.children[0].clientWidth) {
            this.navTarget._removeDataValue('state', 'active')
            document.documentElement.classList.remove('overflow-hidden')
        }
    }
})
