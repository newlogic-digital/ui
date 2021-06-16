import { LibStimulus, Controller } from './Stimulus.js'

LibStimulus.register('lib-drawer', class extends Controller {
    init() {
        setTimeout(() => this.queryTarget('nav').classList.add('is-transition'), 50)
        this.queryTarget('nav').addEventListener('click', (e) => {
            if (e.target === this.queryTarget('nav')) {
                this.hide()
            }
        })
    }

    show() {
        this.queryTarget('nav').scrollLeft = 0
        this.queryTarget('nav').style.setProperty('--drawerOpacity', '1')
        this.queryTarget('nav').classList.add('is-opacity')
        this.queryTarget('nav')._addDataValue('state', 'active')
        document.documentElement.classList.add('is-lib-drawer-active')
    }

    hide() {
        this.queryTarget('nav')._removeDataValue('state', 'active')
        this.queryTarget('nav').classList.add('is-opacity')
        this.queryTarget('nav').style.setProperty('--drawerOpacity', '0')
        document.documentElement.classList.remove('is-lib-drawer-active')
    }

    scroll(e) {
        if (e.target.scrollLeft > 1) {
            this.queryTarget('nav').classList.remove('is-opacity')
            this.queryTarget('nav').style.setProperty('--drawerOpacity', `${Math.abs((e.target.scrollLeft / this.queryTarget('nav').children[0].clientWidth) - 1)}`)
        }

        if (e.target.scrollLeft === this.queryTarget('nav').children[0].clientWidth) {
            this.queryTarget('nav')._removeDataValue('state', 'active')
            document.documentElement.classList.remove('is-lib-drawer-active')
        }
    }
})
