import { LibStimulus, Controller } from '../Libraries/Stimulus.js'

LibStimulus.register('l-header', class extends Controller {
    static targets = ['logo', 'nav']

    connect() {
        if (!document.querySelector('.l-nav')) {
            this.element.insertAdjacentHTML('afterend', `
                <div class="l-nav c-drawer" data-controller="c-drawer" data-action="scroll->c-drawer#scroll c-drawer:close->c-drawer#dismiss" inert>
                    <div class="c-drawer-content"></div>
                </div>
            `)

            const drawerContentElement = document.querySelector('.l-nav .c-drawer-content')

            drawerContentElement.insertAdjacentHTML('beforeend', this.logoTarget.outerHTML)
            drawerContentElement.insertAdjacentHTML('beforeend', this.navTarget.outerHTML)
        }
    }
})
