import cdn from '../Utils/cdn.js'
import { LibStimulus, Controller } from '../Libraries/Stimulus.js'
import { importStyle, checkValidity } from '../Utils/Functions/+.js'

LibStimulus.register('ui-input', class extends Controller {
    async connect() {
        checkValidity(this.element, { validate: false })

        this.element.addEventListener('change', () => checkValidity(this.element))

        this.typeNumber(this.element)

        this.typeFile(this.element)

        await this.typeDatetime(this.element)

        await this.typeColor(this.element)
    }

    typeNumber(element) {
        if (element.querySelector('[type="number"]') !== null) {
            if (element.querySelector('.icon') === null) {
                element.insertAdjacentHTML('beforeend', '<span class="icon icon-angle-down" data-action="minus"></span><span class="icon icon-angle-up" data-action="plus"></span>')
            }

            element.querySelector('[type="number"]').addEventListener('keydown', e => {
                if ([46, 8, 9, 27, 13, 190].indexOf(e.keyCode) !== -1 || e.keyCode === 16 || (e.keyCode === 65 && e.ctrlKey === true) || (e.keyCode >= 35 && e.keyCode <= 39)) {
                    return
                }

                if (((e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault()
                }
            })

            element.querySelector('[data-action="plus"]').addEventListener('click', () => {
                const input = this.element.querySelector('input')
                const num = parseInt(input.value === '' ? 0 : input.value) + parseInt(input.step === '' ? 1 : input.step)

                if (num <= input.max || input.max === '') {
                    input.value = num.toString()
                    input.dispatchEvent(new Event('change', { bubbles: true }))
                }
            })

            element.querySelector('[data-action="minus"]').addEventListener('click', () => {
                const input = this.element.querySelector('input')
                const num = parseInt(input.value) - parseInt(input.step === '' ? 1 : input.step)

                if (num >= input.min || input.min === '') {
                    input.value = num.toString()
                    input.dispatchEvent(new Event('change', { bubbles: true }))
                }
            })
        }
    }

    async typeDatetime(element) {
        const date = element.querySelector('[type^="date"]')

        if (date !== null && !document.documentElement.classList.contains('mobile')) {
            const lang = await import(`/* @vite-ignore */ https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.2.0/js/i18n/locales/${document.documentElement.lang === 'en' ? 'cs' : document.documentElement.lang}.min.js`)
            const { Datepicker } = await import('vanillajs-datepicker')

            await importStyle(cdn.datepicker)

            Object.assign(Datepicker.locales, lang.default)

            const datetime = date.getAttribute('type') === 'datetime-local'
            const required = date.getAttribute('required') !== null
            const placeholder = date.getAttribute('placeholder') !== null
            let currentDate; let currentTime = null

            date.setAttribute('type', 'hidden')
            element.insertAdjacentHTML('beforeend', `<input type="text" inputmode="none" ${required ? 'required' : ''} ${placeholder ? `placeholder="${date.getAttribute('placeholder')}"` : ''}>`)

            const hidden = element.querySelector('[type="hidden"]')

            if (datetime && hidden.value.indexOf(':') !== -1) {
                hidden.setAttribute('data-time', hidden.value.substring(hidden.value.indexOf(':') - 2, hidden.value.length))
            }

            const datepicker = new Datepicker(element.querySelector('[type="text"]'), Object.assign({
                autohide: !datetime,
                language: document.documentElement.lang,
                format: 'dd.mm.yyyy',
                clearBtn: true,
                todayBtn: true,
                todayBtnMode: 1,
                minDate: Datepicker.parseDate(hidden.getAttribute('min'), 'yyyy-mm-dd'),
                maxDate: Datepicker.parseDate(hidden.getAttribute('max'), 'yyyy-mm-dd')
            }, JSON.parse(element.getAttribute('data-lib-datepicker'))))
            datepicker.setDate(Datepicker.parseDate(hidden.value, 'yyyy-mm-dd'))

            if (datetime && hidden.value) {
                element.insertAdjacentHTML('afterbegin', `<span class="input" ${placeholder ? 'placeholder' : ''}><span>${datepicker.getDate('dd.mm.yyyy') + '</span>&nbsp;' + hidden.dataset.time}</span>`)
            }

            if (datetime) {
                datepicker.element.addEventListener('keydown', e => {
                    if (e.key === 'Backspace' || e.key === 'Delete') {
                        datepicker.setDate({ clear: true })
                    } else {
                        e.preventDefault()
                    }
                })
            }

            datepicker.element.addEventListener('changeDate', () => {
                if (typeof hidden.dataset.time !== 'undefined') {
                    if (typeof datepicker.getDate('yyyy-mm-dd') !== 'undefined') {
                        hidden.value = datepicker.getDate('yyyy-mm-dd') + 'T' + hidden.dataset.time

                        const value = '<span>' + datepicker.getDate('dd.mm.yyyy') + '</span>&nbsp;' + hidden.dataset.time

                        if (element.querySelector('.input') === null) {
                            element.insertAdjacentHTML('afterbegin', `<span class="input" ${placeholder ? 'placeholder' : ''}>${value}</span>`)
                        } else {
                            element.querySelector('.input').innerHTML = value
                        }
                    } else {
                        hidden.value = ''
                        element.querySelector('.input').textContent = ''
                    }
                } else if (datepicker.getDate()) {
                    hidden.value = datepicker.getDate('yyyy-mm-dd')
                } else {
                    hidden.value = ''
                }

                hidden.dispatchEvent(new Event('change', { bubbles: true }))
            })

            datepicker.element.addEventListener('show', element => {
                const footer = element.detail.datepicker.picker.element.querySelector('.datepicker-footer')
                currentDate = datepicker.getDate('yyyy-mm-dd')

                this.element._addDataValue('state', 'active')

                if (footer.querySelector('[type="time"]') === null && datetime) {
                    let time = hidden.dataset.time

                    if (typeof time === 'undefined') {
                        time = new Date().toLocaleTimeString('de', { hour: '2-digit', minute: '2-digit' })
                        hidden.setAttribute('data-time', time)
                    }

                    currentTime = time

                    footer.querySelector('.datepicker-controls').insertAdjacentHTML('beforeend', `<input type="time" value="${time}" aria-label="Text"><button type="button" data-ok class="button ok-btn" style="width: auto;">Ok</button>`)

                    footer.querySelector('[type="time"]').addEventListener('change', e => {
                        hidden.setAttribute('data-time', e.target.value)
                    })

                    footer.querySelector('[type="time"]').addEventListener('mousedown', e =>
                        e.stopPropagation()
                    )

                    footer.querySelector('[type="time"]').addEventListener('blur', e => {
                        e.stopPropagation()
                        e.preventDefault()
                        datepicker.element.focus()
                    })

                    footer.querySelector('[data-ok]').addEventListener('click', () => {
                        if (hidden.value === '') {
                            footer.querySelector('.today-btn').click()
                        }

                        datepicker.element.focus()
                        datepicker.hide()
                    })
                } else if (datetime) {
                    currentTime = hidden.dataset.time
                }
            })

            datepicker.element.addEventListener('hide', element => {
                if (hidden.value === '') {
                    this.element._removeDataValue('state', 'active')
                } else {
                    if (datetime) {
                        element.detail.datepicker.picker.element.querySelector('[type="time"]').dispatchEvent(new Event('change', { bubbles: true }))

                        if (currentDate !== datepicker.getDate('yyyy-mm-dd') || currentTime.toString() !== hidden.dataset.time.toString()) {
                            datepicker.element.dispatchEvent(new Event('changeDate', { bubbles: true }))
                        }
                    }
                }
            })
        }
    }

    async typeColor(element) {
        if (element.querySelector('[type="color"]') !== null) {
            const Pickr = (await import('@simonwep/pickr')).default
            const input = element.querySelector('input')

            await importStyle(cdn.pickrCss)

            element.setAttribute('data-type', 'color')
            element.querySelector('[type="color"]').setAttribute('inputmode', 'none')
            element.querySelector('[type="color"]').setAttribute('type', 'text')
            element.insertAdjacentHTML('afterbegin', '<span class="color"></span>')

            input.setAttribute('maxlength', '9')
            input.setAttribute('pattern', '^#?([a-fA-F0-9]{8}|[a-fA-F0-9]{6}|[a-fA-F0-9]{3})$')

            const pickr = new Pickr({
                el: input,
                useAsButton: true,
                theme: 'nano',
                position: 'bottom-start',
                components: {
                    preview: true,
                    opacity: true,
                    hue: true,
                    interaction: {
                        hex: true,
                        rgba: true,
                        input: true
                    }
                }
            }).on('init', pickr => {
                pickr.setColor(input.value)
            }).on('change', color => {
                input.value = color.toHEXA().toString()
                element.querySelector('.color').style['background-color'] = color.toHEXA().toString()
            }).on('hide', pickr => {
                pickr.applyColor()
                input.dispatchEvent(new Event('change', { bubbles: true }))
            })

            input.addEventListener('change', ({ target }) => {
                pickr.setColor(target.value)
            })
        }
    }

    typeFile(element) {
        if (element.querySelector('[type="file"]') !== null) {
            element.setAttribute('data-type', 'file')
            element.insertAdjacentHTML('beforeend', `<span class="icon icon-paper-clip">${element.querySelector('input').title}</span><span data-placeholder="${element.querySelector('input').placeholder}"></span>`)
            element.querySelector('input').addEventListener('change', e => {
                const placeholder = element.querySelector('span:not(.icon)')

                if (e.target.getAttribute('multiple') === null) {
                    placeholder.removeAttribute('data-placeholder')
                    placeholder.textContent = e.target.value.replace(/.*(\/|\\)/, '')
                } else {
                    const files = e.target.files
                    placeholder.removeAttribute('data-placeholder')
                    placeholder.textContent = Object.keys(files).length === 1 ? e.target.value.replace(/.*(\/|\\)/, '') : `${Object.keys(files).length} soubory`
                }
            })
        }
    }
})
