import { LibStimulus, Controller } from '../Libraries/Stimulus.js'

LibStimulus.register('ui-text', class extends Controller {
    connect() {
        function wrap(element, wrapper) {
            element.parentNode.insertBefore(wrapper, element)
            wrapper.appendChild(element)
        }

        this.element.querySelectorAll('table').forEach((table) => {
            wrap(table, new DOMParser().parseFromString('<div class="overflow-x-auto max-w-full"></div>', 'text/html').body.firstChild)
        })

        this.element.querySelectorAll('iframe').forEach((iframe) => {
            if (iframe.width && iframe.height) {
                iframe.style.aspectRatio = iframe.width + '/' + iframe.height
                iframe.style.height = 'auto'
            }
        })
    }
})
