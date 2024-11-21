import Swup from 'swup'
import { SwupCorePlugin } from '@newlogic-digital/swup-plugins'
import initAfter from '../utils/initAfter.js'
import { useController } from 'winduum-stimulus'

const useSwup = new Swup({
    containers: ['.x-main', '.x-header'],
    plugins: [new SwupCorePlugin()]
})

useSwup.hooks.on('animation:out:start', async () => {
    useController('x-drawer', '.x-drawer').invoke('close')
    useController('x-dialog', '.x-dialog').invoke('close')
})

useSwup.hooks.on('content:replace', () => {
    useSwup.options.containers.forEach((selector) => {
        initAfter(document.querySelector(selector))
    })
})

export default useSwup
