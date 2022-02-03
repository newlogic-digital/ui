import { LibStimulus, Controller, getController } from '../Libraries/Stimulus.js'

LibStimulus.register('l-header', class extends Controller {
    connect() {
        if (document.querySelector('#l-nav') === null) {
            this.element.insertAdjacentHTML('afterend', '<div id="l-nav" class="lib-drawer" data-lib-drawer-target="nav" data-action="scroll->lib-drawer#scroll"><div class="wrp_nav"><div class="wrp_nav_head"></div><div class="wrp_nav_body"></div></div></div>')

            getController(document.body, 'lib-drawer').init()

            const layoutNav = document.querySelector('#l-nav')
            const logo = this.element.querySelector('.elm_header_logo').outerHTML
            const nav = this.element.querySelector('.elm_header_nav').outerHTML

            layoutNav.querySelector('.wrp_nav_head').insertAdjacentHTML('beforeend', logo)
            layoutNav.querySelector('.wrp_nav_body').insertAdjacentHTML('beforeend', nav)
        }
    }
})
