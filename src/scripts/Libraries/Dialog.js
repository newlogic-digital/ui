import { Controller, LibStimulus, loadStimulus } from './Stimulus.js'
import { insertDialog, closeDialog, fetchDialog, dialogSelector } from 'winduum/src/libraries/dialog.js'

LibStimulus.register('lib-dialog', class extends Controller {
    static values = {
        open: String,
        url: String
    }

    async connect() {
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

    async show({ currentTarget, params }) {
        currentTarget._addDataValue('state', 'loading')
        currentTarget.classList.add('cursor-wait')

        await fetchDialog({
            url: params.url,
            insertOptions: {
                remove: params.remove ?? true,
                append: params.append ?? false
            }
        }).then(() => loadStimulus(dialogSelector('.lib-dialog')))

        currentTarget._removeDataValue('state', 'loading')
        currentTarget.classList.remove('cursor-wait')
    }

    async hide({ params }) {
        await closeDialog({ remove: params.remove ?? false })
    }
})
