import { LibStimulus, Controller } from '../Libraries/Stimulus.js'
import LibCookieConsent from '../Libraries/CookieConsent.js'

LibStimulus.register('c-cookieconsent', class extends Controller {
    connect() {
        const selector = this.element

        if (document.querySelector('.c-form-cookieconsent') !== null) {
            return
        }

        if (LibCookieConsent.getItem('lib-cookieconsent') === null || parseInt(LibCookieConsent.getItem('lib-cookieconsent-expire')) < Date.now()) {
            setTimeout(() => {
                selector._addDataValue('state', 'active')
                selector.classList.add('is-animate')
            }, 1500)
        }

        selector.querySelector('[data-lib-cookieconsent-approve]').addEventListener('click', () => {
            this.hide(['performance', 'marketing'])
        })

        selector.querySelector('[data-lib-cookieconsent-decline]').addEventListener('click', () => {
            this.hide([])
        })
    }

    hide(type) {
        LibCookieConsent.set(type)
        this.element.classList.remove('is-animate')

        setTimeout(() => {
            this.element._removeDataValue('state', 'active')
            this.element.remove()
        }, 500)
    }
})

LibStimulus.register('c-form-cookieconsent', class extends Controller {
    connect() {
        const selector = this.element
        const type = LibCookieConsent.getItem('lib-cookieconsent')
        const modal = document.querySelector('.c-cookieconsent')

        if (modal) {
            modal.classList.remove('is-animate')
            modal._removeDataValue('state', 'active')
        }

        if (type !== null) {
            this.element.querySelectorAll('input:not([disabled])').forEach(input => {
                input.checked = false
            })

            JSON.parse(type).forEach(type => {
                if (selector.querySelector(`input[value="${type}"]`) !== null) {
                    selector.querySelector(`input[value="${type}"]`).checked = true
                }
            })
        }

        selector.addEventListener('submit', e => {
            e.preventDefault()

            const type = []

            this.element.querySelectorAll('input:not([disabled])').forEach(input => {
                input.checked && type.push(input.value)
            })

            LibCookieConsent.set(type)
            location.reload()
        })
    }

    disconnect() {
        const modal = document.querySelector('.c-cookieconsent')

        if (modal && (LibCookieConsent.getItem('lib-cookieconsent') === null || parseInt(LibCookieConsent.getItem('lib-cookieconsent-expire')) < Date.now())) {
            modal._addDataValue('state', 'active')
            modal.classList.add('is-animate')
        }
    }
})
