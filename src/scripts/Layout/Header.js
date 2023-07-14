import { LibStimulus, Controller, getController } from '../Libraries/Stimulus.js'

LibStimulus.register('l-header',
    /** @property {LibDrawer} libDrawerOutlet */
    class extends Controller {
        connect () {
            if (document.querySelector('#l-nav') === null) {
                this.element.insertAdjacentHTML('afterend', `
                    <div id="l-nav" class="lib-drawer" data-controller="lib-drawer" data-action="scroll->lib-drawer#scroll" inert>
                        <div class="l_nav">
                            <div class="l_nav_head"></div>
                            <div class="l_nav_body"></div>
                        </div>
                    </div>
                `)

                const layoutNav = document.querySelector('#l-nav')
                const logo = this.element.querySelector('.l_header_logo').outerHTML
                const nav = this.element.querySelector('.l_header_nav').outerHTML

                layoutNav.querySelector('.l_nav_head').insertAdjacentHTML('beforeend', logo)
                layoutNav.querySelector('.l_nav_body').insertAdjacentHTML('beforeend', nav)
            }
        }

        showDrawer () {
            /** @type {LibDrawer} */
            const LibDrawer = getController(document.querySelector('[data-controller~="lib-drawer"]'), 'lib-drawer')
            LibDrawer.show()
        }
    }
)
