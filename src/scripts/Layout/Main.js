import { LibStimulus, Controller } from '../Libraries/Stimulus.js'
import LibTippy from '../Libraries/Tippy.js'
import { initSlider, nextSlide, prevSlide, selectSlide } from '../Libraries/Slider.js'

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
        const attributes = this.element.dataset.libTippy

        new LibTippy(this.element, attributes?.replace(/\s/g, '')?.split(','))
    }
})

LibStimulus.register('lib-slider', class extends Controller {
    static targets = ['slider', 'dots', 'progress', 'counterMin', 'counterMax']

    connect () {
        initSlider(this.sliderTarget, {
            paginationSelector: this.hasDotsTarget ? this.dotsTarget : null,
            paginationItemClass: 'ui-dot',
            progressSelector: this.hasProgressTarget ? this.progressTarget : null,
            counterMinSelector: this.hasCounterMinTarget ? this.counterMinTarget : null,
            counterMaxSelector: this.hasCounterMaxTarget ? this.counterMaxTarget : null,
            pauseSelector: this.element.querySelectorAll('[data-action*="lib-slider"]')
        })
    }

    next () {
        nextSlide(this.sliderTarget)
    }

    prev () {
        prevSlide(this.sliderTarget)
    }

    select () {
        selectSlide(this.sliderTarget)
    }
})
