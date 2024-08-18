import { LibStimulus, Controller } from './Stimulus.js'
import { appendCookieConsent, setCookieConsent } from '@newlogic-digital/cookieconsent-js'
import { showDialog, closeDialog } from 'winduum/src/components/dialog/index.js'

export const getCookieConsentItem = (key = 'cookieconsent-js') => localStorage.getItem(key)

export const initCookieConsent = (element = document, type = getCookieConsentItem() ?? []) => {
    element.querySelectorAll('[data-lib-cookieconsent]').forEach((element) => {
        if (type.includes(element.getAttribute('data-lib-cookieconsent'))) {
            appendCookieConsent(element)
        }
    })
}

LibStimulus.register('c-dialog-cookieconsent', class extends Controller {
    async connect() {
        initCookieConsent()

        if (document.querySelector('.c-form-cookieconsent')) {
            return
        }

        if (!getCookieConsentItem() || parseInt(getCookieConsentItem('cookieconsent-js-expire')) < Date.now()) {
            setTimeout(async () => {
                await showDialog(this.element, { closable: false })
            }, 1500)
        } else {
            this.element.remove()
        }
    }

    async approve() {
        await this.hide(['performance', 'marketing'])
    }

    async decline() {
        await this.hide([])
    }

    async hide(type) {
        await setCookieConsent(type)
        initCookieConsent(document, type)
        await closeDialog(this.element, { remove: true })
    }
})

LibStimulus.register('c-form-cookieconsent', class extends Controller {
    connect() {
        document.querySelector('.c-dialog-cookieconsent')?.close()

        this.element.querySelectorAll('input:not([disabled])').forEach((input) => {
            input.checked = false
        })

        JSON.parse(getCookieConsentItem())?.forEach((type) => {
            if (this.element.querySelector(`input[value="${type}"]`) !== null) {
                this.element.querySelector(`input[value="${type}"]`).checked = true
            }
        })
    }

    async update() {
        const type = []

        this.element.querySelectorAll('input:not([disabled])').forEach((input) => {
            input.checked && type.push(input.value)
        })

        await setCookieConsent(type)
        location.reload()
    }

    disconnect() {
        if ((!getCookieConsentItem() || parseInt(getCookieConsentItem('cookieconsent-js-expire')) < Date.now())) {
            document.querySelector('.c-dialog-cookieconsent')?.showModal()
        }
    }
})
