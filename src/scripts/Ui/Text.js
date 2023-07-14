import { LibStimulus, Controller } from '../Libraries/Stimulus.js'

LibStimulus.register('ui-text', class extends Controller {
    connect () {
        function wrap (element, wrapper) {
            element.parentNode.insertBefore(wrapper, element)
            wrapper.appendChild(element)
        }

        this.element.querySelectorAll('table').forEach(table => {
            wrap(table, new DOMParser().parseFromString('<div class="c_text_table"></div>', 'text/html').body.firstChild)
        })

        this.element.querySelectorAll('iframe').forEach(iframe => {
            if (iframe.width && iframe.style.aspectRatio !== 'undefined') {
                iframe.style.aspectRatio = iframe.width + '/' + iframe.height
                iframe.style.height = 'auto'
            }
        })
    }
})
