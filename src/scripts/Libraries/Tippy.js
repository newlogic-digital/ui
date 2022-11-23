import { loadStimulus, importStyle } from '../Utils/Functions/+.js'
import cdn from '../Utils/cdn.js'

export default class LibTippy {
    async init(element, options, template) {
        const tippy = (await import('tippy.js')).default
        const { roundArrow } = await import('tippy.js')

        await importStyle(cdn.tippy)

        if (typeof element._tippy !== 'undefined') {
            return false
        }

        if (this.type.includes('dropdown')) {
            this.options.placement = 'bottom-end'
            this.options.arrow = false
            this.options.maxWidth = 'none'
        }

        if (this.type.includes('arrow')) {
            options.arrow = roundArrow
        }

        if (!template.startsWith('/')) {
            if (template !== '') {
                options.content = document.querySelector('#' + template).innerHTML
            } else {
                options.content = `
                  <div class="c-dropdown">
                    <div class="wrp_dropdown_body">
                      ${element.getAttribute('aria-label')}
                    </div>
                  </div>
                `
            }
        }

        if (typeof element.dataset.libTippySlot !== 'undefined') {
            for (const [key, value] of Object.entries(JSON.parse(element.dataset.libTippySlot))) {
                options.content = options.content.replaceAll(`{${key}}`, value).replaceAll(`%7B${key}%7B`, value)
            }
        }

        tippy(element, options)
    }

    constructor(element, attributes = ['tooltip', '']) {
        const self = this

        this.options = {
            content: '',
            placement: 'bottom',
            trigger: 'mouseenter focus',
            interactive: true,
            appendTo: 'parent',
            arrow: false,
            theme: 'light-border',
            animation: 'scale',
            inertia: true,
            allowHTML: true,
            onShow: (instance) => {
                let name = this.template

                if (this.type.includes('-full')) {
                    instance.popper.classList.add('is-full')
                    document.documentElement.classList.add('m:is-body-overlay')
                }

                if (typeof name === 'undefined') {
                    name = this.type
                }

                instance.popper.querySelector('.tippy-box').setAttribute('data-name', name)

                loadStimulus(instance.popper.querySelector('.tippy-content'))
            },
            onHide: () => {
                if (this.type.includes('-full')) {
                    setTimeout(() => document.documentElement.classList.remove('m:is-body-overlay'), 50)
                }
            }
        }

        this.type = attributes[0]
        this.template = attributes[1]

        if (this.type.includes('dropdown')) {
            this.options.trigger = 'click'
        }

        if (typeof element.dataset.tippyTrigger !== 'undefined') {
            this.options.trigger = element.dataset.tippyTrigger
        }

        this.options.showOnCreate = true

        this.options.trigger !== 'manual' && this.options.trigger.split(' ').forEach(event => {
            element.addEventListener(event, async function e() {
                if (self.template.startsWith('/') && self.options.content === '') {
                    element.style.cursor = 'wait'
                    element._addDataValue('state', 'loading')

                    fetch(self.template, { headers: { 'X-Requested-With': 'XMLHttpRequest' } }).then(response => {
                        return response.json()
                    }).then(async(data) => {
                        self.options.content = data.content
                        element.style.cursor = ''
                        element._removeDataValue('state', 'loading')
                        await self.init(element, self.options, self.template)
                        element.removeEventListener(event, e)
                    })
                } else {
                    await self.init(element, self.options, self.template)
                    element.removeEventListener(event, e)
                }
            })
        })
    }
}
