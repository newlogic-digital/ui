import naja from 'naja'

export const initNaja = (element, bindUI = true, selectors = 'button, [role="button"]') => {
    bindUI && naja.uiHandler.bindUI(element)

    element.querySelectorAll(`:where(${selectors})${naja.uiHandler.selector}`).forEach((element) => {
        if (element.form && element.type === 'submit') return

        element.addEventListener('click', (event) => {
            naja.uiHandler.processInteraction(element, element.dataset.najaMethod ?? 'GET', element.dataset.najaUrl, element.dataset.najaData, {}, event)
        })
    })
}

export const NajaFormValidityExtension = {
    initialize(naja) {
        naja.uiHandler.addEventListener('interaction', (event) => {
            const { element } = event.detail

            if (element?.form && !element.form.reportValidity()) {
                event.preventDefault()
            }
        })
    }
}

export const NajaRecaptchaExtension = {
    initialize(naja) {
        naja.uiHandler.addEventListener('interaction', (event) => {
            const { element } = event.detail

            if (
                (element.form ?? element)?.dataset?.controller?.includes('lib-recaptcha')
                && !event.detail?.originalEvent?.detail?.recaptchaExecuted
            ) {
                event.preventDefault()
                return false
            }
        })
    }
}
