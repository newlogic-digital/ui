import { LibStimulus, Controller } from './Stimulus.js'
import { initSlider, nextSlide, prevSlide, selectSlide } from '../Utils/ns.js'

LibStimulus.register('lib-ns', class extends Controller {
    static targets = ['slider', 'dots']

    connect () {
        initSlider(this.sliderTarget, {
            paginationSelector: this.dotsTarget,
            paginationItemClass: 'ui-dot'
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
