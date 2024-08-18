import { Controller, LibStimulus } from './Stimulus.js'
import { dataset } from '@newlogic-digital/utils-js'

LibStimulus.register('lib-reveal', class extends Controller {
    static targets = ['item']

    intersectionObserver() {
        this.observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio > 0.1 && !entry.target.classList.contains('in')) {
                    entry.target.classList.add('in')

                    if (entry.target.dataset.controllerNameParam) {
                        dataset(entry.target, 'controller').add(entry.target.dataset.controllerNameParam)
                    }
                }
            })
        }, {
            threshold: 0.1
        })
    }

    itemTargetConnected(element) {
        if (!this.observer) this.intersectionObserver()

        this.observer?.observe(element)
    }

    itemTargetDisconnected(element) {
        this.observer?.unobserve(element)
    }
})
