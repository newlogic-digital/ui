import { Controller, LibStimulus } from './../Libraries/Stimulus.js'
import { insertDialog, closeDialog, dialogSelector } from 'winduum/src/components/dialog/index.js'
import initAfter from '../Utils/initAfter.js'
import { fetchJson } from '@newlogic-digital/utils-js'

LibStimulus.register('lib-dialog', class extends Controller {
    async show({ currentTarget, params }) {
        const loadingClasses = (params.loadingClass ?? 'loading cursor-wait').split(' ')

        currentTarget.classList.add(...loadingClasses)

        await this.fetch(params.url, params)

        currentTarget.classList.remove(...loadingClasses)
    }

    async close({ currentTarget, params }) {
        await closeDialog(currentTarget.closest('dialog'), { remove: params.remove ?? true })
    }

    async fetch(url, options) {
        const { content } = await fetchJson(url)

        await insertDialog(content, options)

        initAfter(dialogSelector('.c-dialog'))
    }
})
