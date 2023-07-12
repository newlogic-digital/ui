import { LibStimulus, Controller } from '../Libraries/Stimulus.js'

LibStimulus.register('ui-text', class extends Controller {
    connect () {
        this.element.querySelectorAll('table').forEach(table => {
            this.wrap(table, new DOMParser().parseFromString('<div class="c_text_table"></div>', 'text/html').body.firstChild)
        })

        this.element.querySelectorAll('iframe').forEach(iframe => {
            if (iframe.src.match(/youtube\.com/i)) {
                this.wrap(iframe, new DOMParser().parseFromString(`<div class="c_text_video" style="max-width: ${iframe.width.includes('%') ? iframe.width : iframe.width + 'px'}"></div>`, 'text/html').body.firstChild)
            } else if (iframe.width && iframe.style.aspectRatio !== 'undefined') {
                iframe.style.aspectRatio = iframe.width + '/' + iframe.height
                iframe.style.height = 'auto'
            }
        })
    }

    wrap (el, wrapper) {
        el.parentNode.insertBefore(wrapper, el)
        wrapper.appendChild(el)
    }
})
