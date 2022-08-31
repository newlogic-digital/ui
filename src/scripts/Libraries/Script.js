import { LibStimulus, Controller } from './Stimulus.js'

LibStimulus.register('lib-script', class extends Controller {
    connect() {
        const element = this.element
        const script = document.createElement('script')

        ;[...element.attributes].forEach(attribute => {
            if (attribute.specified && !attribute.name.includes('type') && !attribute.name.includes('data-controller')) {
                script.setAttribute(attribute.name, attribute.value)
            }
        })

        script.innerHTML = element.innerHTML

        element.parentElement.appendChild(script)
        element.remove()
    }
})
