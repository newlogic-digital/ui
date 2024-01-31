import { Controller, LibStimulus, loadStimulus } from './Stimulus.js'
import { insertDialog, closeDialog, fetchDialog, dialogSelector } from 'winduum/src/components/dialog/index.js'
import { replaceScript } from '../Utils/Functions/+.js'

LibStimulus.register('lib-dialog', class extends Controller {
    static values = {
        open: String,
        url: String
    }

    async connect () {
        if (this.hasOpenValue) {
            if (this.hasUrlValue) {
                await fetchDialog({
                    url: this.urlValue, insertOptions: { remove: true }
                })
            } else {
                await insertDialog(document.querySelector(this.openValue).innerHTML, {
                    remove: true
                })
            }

            loadStimulus(dialogSelector('.lib-dialog'))
        }
    }

    async show ({ currentTarget, params }) {
        currentTarget.classList.add('loading', 'cursor-wait')

        await fetch(params.url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
            .then(response => response.json())
            .then(async ({ content }) => {
                await insertDialog(`<dialog class="c-dialog">${content}</dialog>`, {
                    remove: params.remove ?? true,
                    append: params.append ?? false
                })

                loadStimulus(dialogSelector('.c-dialog'))
                replaceScript(dialogSelector('.c-dialog'))
            })

        currentTarget.classList.remove('loading', 'cursor-wait')
    }

    async close ({ currentTarget, params }) {
        await closeDialog(currentTarget.closest('dialog'), { remove: params.remove ?? false })
    }
})
