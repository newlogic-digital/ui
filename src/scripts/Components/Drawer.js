import { LibStimulus, Controller } from '../Libraries/Stimulus.js'
import { showDrawer, closeDrawer, scrollDrawer } from 'winduum/src/components/drawer/index.js'

LibStimulus.register('c-drawer', class extends Controller {
    static values = {
        inertMatch: {
            type: String,
            default: ':where(.c-drawer, .l-header)'
        }
    }

    connect() {
        this.scrollReset()
        this.element.addEventListener('click', ({ target }) => {
            if (target === this.element) this.close()
        })
    }

    scrollReset() {
        this.element.scroll({ left: this.element.scrollWidth, behavior: 'instant' })
    }

    scroll({ target }) {
        scrollDrawer(target)
    }

    inert(inert) {
        [...document.body.children].forEach((element) => {
            if (!element.matches(this.inertMatchValue)) (element.inert = inert)
        })
    }

    show() {
        this.scrollReset()
        this.element.classList.add('active')
        showDrawer(this.element)
        this.inert(true)
    }

    close() {
        closeDrawer(this.element)
    }

    toggle({ currentTarget }) {
        this.activeButton = currentTarget

        if (!currentTarget.classList.contains('active')) {
            currentTarget.classList.add('active')
            this.show()
        } else {
            this.close()
        }
    }

    dismiss() {
        this.element.classList.remove('active')
        this.activeButton?.classList?.remove('active')
        this.inert(false)
    }
})
