import { LibStimulus, Controller } from '../Libraries/Stimulus.js'
import LibCookieConsent from '../Libraries/CookieConsent.js'

LibCookieConsent.init()

LibStimulus.register('c-cookieconsent', class extends Controller {
    connect() {
        const selector = this.element

        if (localStorage.getItem('cookieconsent') === null) {
            setTimeout(() => {
                selector._addDataValue('state', 'active')
                selector.classList.add('is-animate')
            }, 1500)
        }

        selector.addEventListener('click', () => {
            selector.classList.add('is-mobile-show')
        })

        selector.querySelector('[data-lib-cookieconsent-approve]').addEventListener('click', () => {
            LibCookieConsent.set('approve')
            selector.classList.remove('is-animate')

            setTimeout(() => {
                selector._removeDataValue('state', 'active')
                selector.remove()
            }, 500)
        })

        selector.querySelector('[data-lib-cookieconsent-decline]').addEventListener('click', () => {
            LibCookieConsent.set('performance')
            selector.classList.remove('is-animate')

            setTimeout(() => {
                selector._removeDataValue('state', 'active')
                selector.remove()
            }, 500)
        })
    }
})

LibStimulus.register('c-form-cookieconsent', class extends Controller {
    connect() {
        const selector = this.element

        if (localStorage.getItem('cookieconsent') !== null) {
            if (localStorage.getItem('cookieconsent') === 'approve') {
                const type = localStorage.getItem('cookieconsent_type')

                if (type !== null) {
                    if (type === 'performance') {
                        selector.querySelector('input[value="performance"]').checked = true
                    } else {
                        selector.querySelector('input[value="approve"]').checked = true
                    }
                } else {
                    selector.querySelector('input[value="approve"]').checked = true
                }
            } else if (localStorage.getItem('cookieconsent') === 'decline') {
                selector.querySelector('input[value="decline"]').checked = true
            }
        }

        selector.addEventListener('submit', e => {
            e.preventDefault()

            const value = (new FormData(e.target)).get('cookies')

            if (value === 'approve') {
                LibCookieConsent.set('marketing')
                location.reload()
            } else if (value === 'performance') {
                LibCookieConsent.set('performance')
                location.reload()
            } else if (value === 'decline') {
                LibCookieConsent.set('decline', () => location.reload())
            }
        })
    }
})
