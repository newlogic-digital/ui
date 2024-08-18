import { Controller, LibStimulus } from '../Libraries/Stimulus.js'

export const insertToaster = async (element, options) => {
    if (!document.querySelector('.c-toaster')) {
        element.insertAdjacentHTML('beforeend', `<ol class="c-toaster ${options?.classes ?? ''}" data-lib-toaster-target="toaster"></ol>`)
    }
}

export const insertToast = async (element, options) => {
    const { showToast } = await import('winduum/src/components/toaster/index.js')

    element.insertAdjacentHTML('beforeend', `
        <li class="c-toast ${options.classes ?? ''}" role="status" aria-live="assertive" aria-atomic="true" data-controller="c-toast">
            <div class="c-toast-content border-main/10">
                <div class="flex-col gap-0.5">
                    <div class="ui-title empty:hidden">${options.title ?? ''}</div>
                    <div class="ui-title sm font-normal empty:hidden text-main/70">${options.text ?? ''}</div>
                </div>
                <button class="ui-btn sm circle muted ml-auto accent-main -mr-1" data-action="c-toast#close">
                    <svg class="size-4">
                        <use href="#icon-x-mark"></use>
                    </svg>
                </button>
            </div>
        </li>
    `)

    await showToast(element.children[element.children.length - 1], {
        autoHide: false,
        ...options?.show
    })
}

LibStimulus.register('lib-toaster', class extends Controller {
    static targets = ['toaster', 'show']

    async show({ params }) {
        await insertToaster(document.querySelector('dialog[open]') || document.body)
        await insertToast(this.toasterTarget, params)
    }

    async showTargetConnected(element) {
        await this.show({
            params: JSON.parse(element.innerHTML)
        })
    }
})

LibStimulus.register('c-toast', class extends Controller {
    async close() {
        const { closeToast } = await import('winduum/src/components/toaster/index.js')

        await closeToast(this.element)
    }
})
