import { LibStimulus, Controller } from './Stimulus.js'

LibStimulus.register('lib-drawer', class extends Controller {
    init() {
        setTimeout(() => this.queryTarget('nav').classList.add('is-transition'), 50)
        this.queryTarget('nav').addEventListener('click', ({ target }) => {
            if (target === this.queryTarget('nav')) {
                this.hide()
            }
        })
    }

    show() {
        this.queryTarget('nav').scrollLeft = 0
        this.queryTarget('nav').style.setProperty('--lib-drawer-opacity', '1')
        this.queryTarget('nav').classList.add('is-opacity')
        this.queryTarget('nav')._addDataValue('state', 'active')
        document.documentElement.classList.add('overflow-hidden')
    }

    hide() {
        this.queryTarget('nav')._removeDataValue('state', 'active')
        this.queryTarget('nav').classList.add('is-opacity')
        this.queryTarget('nav').style.setProperty('--lib-drawer-opacity', '0')
        document.documentElement.classList.remove('overflow-hidden')
    }

    scroll({ target }) {
        if (target.scrollLeft > 1) {
            this.queryTarget('nav').classList.remove('is-opacity')
            this.queryTarget('nav').style.setProperty('--lib-drawer-opacity', `${Math.abs((target.scrollLeft / this.queryTarget('nav').children[0].clientWidth) - 1)}`)
        }

        if (target.scrollLeft === this.queryTarget('nav').children[0].clientWidth) {
            this.queryTarget('nav')._removeDataValue('state', 'active')
            document.documentElement.classList.remove('overflow-hidden')
        }
    }
})
