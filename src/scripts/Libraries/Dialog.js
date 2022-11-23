import { loadStimulus } from './Stimulus.js'

const LibDialog = {
    show: async(content) => {
        return new Promise(resolve => {
            if (document.querySelector('.lib-dialog > [class^="c-dialog"]') !== null) {
                document.querySelector('.lib-dialog > [class^="c-dialog"]').remove()
            }

            if (document.querySelector('.lib-dialog') === null) {
                document.body.insertAdjacentHTML('beforeend', '<div class="lib-dialog" tabindex="0"></div>')
            }

            document.querySelector('.lib-dialog').insertAdjacentHTML('beforeend', content)
            document.querySelector('.lib-dialog').style.display = 'flex'

            function outerHeight(el) {
                return el.offsetHeight + parseInt(getComputedStyle(el).marginTop) + parseInt(getComputedStyle(el).marginBottom)
            }

            if (outerHeight(document.querySelector('.lib-dialog > [class^="c-dialog"]')) > window.innerHeight) {
                const offset = window.innerWidth - document.body.clientWidth

                document.documentElement.style.paddingRight = `${offset}px`
                document.documentElement.classList.add('overflow-hidden')

                if (document.querySelector('#l-header') !== null) {
                    document.querySelector('#l-header').style.right = `${offset}px`
                }
            }

            loadStimulus(document.querySelector('.lib-dialog'))

            document.querySelector('.lib-dialog').focus()

            resolve()

            document.querySelector('.lib-dialog').addEventListener('mousedown', e => {
                if (e.target.classList.contains('lib-dialog')) {
                    document.documentElement.addEventListener('mouseup', function e() {
                        LibDialog.hide()
                        document.documentElement.removeEventListener('mouseup', e)
                    })
                }
            }, true)
        })
    },
    hide: async() => {
        return new Promise(resolve => {
            if (document.querySelector('.lib-dialog') !== null) {
                document.querySelector('.lib-dialog')._addDataValue('state', 'hiding')
            }

            setTimeout(() => {
                if (document.querySelector('.lib-dialog') !== null) {
                    document.querySelector('.lib-dialog').style.display = 'none'
                    document.documentElement.classList.remove('overflow-hidden')

                    if (document.querySelector('#l-header') !== null) {
                        document.querySelector('#l-header').style.right = ''
                    }

                    document.querySelector('.lib-dialog').remove()
                }

                resolve()
            }, 300)
        })
    },
    action: async(element, url) => {
        element._addDataValue('state', 'loading')
        element.classList.add('cursor-wait')

        fetch(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } }).then(response => response.json()).then(({ dialog }) => {
            LibDialog.show(dialog)
            element._removeDataValue('state', 'loading')
            element.classList.remove('cursor-wait')
        })
    }
}

export default LibDialog
