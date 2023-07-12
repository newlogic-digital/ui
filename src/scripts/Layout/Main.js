import { LibStimulus, Controller } from '../Libraries/Stimulus.js'
import LibTippy from '../Libraries/Tippy.js'

LibStimulus.register('lib', class extends Controller {
    darkMode () {
        if (document.documentElement.classList.contains('dark')) {
            localStorage.theme = 'light'
            document.documentElement.classList.remove('dark')
        } else {
            localStorage.theme = 'dark'
            document.documentElement.classList.add('dark')
        }
    }
})

LibStimulus.register('lib-tippy', class extends Controller {
    connect () {
        const attributes = this.element.getAttribute('data-lib-tippy')

        new LibTippy(this.element, attributes?.replace(/\s/g, '')?.split(','))
    }
})
