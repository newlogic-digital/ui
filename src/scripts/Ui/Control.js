import cdn from '../Utils/cdn.js'
import { LibStimulus, Controller } from '../Libraries/Stimulus.js'
import { importStyle, inputValidity } from '../Utils/Functions/+.js'

LibStimulus.register('ui-control', class extends Controller {
    static targets = ['number']

    static values = {
        dateOptions: {
            default: {},
            type: Object
        },
        dateDisabled: {
            default: [],
            type: Array
        }
    }

    async connect () {
        inputValidity(this.element, { validate: false })

        this.element.addEventListener('change', () => inputValidity(this.element))

        if (this.element.querySelector('select')) {
            return
        }

        this.typeNumber()

        await this.typeDate()

        await this.typeColor()
    }

    async typeDate () {
        const input = this.element.querySelector('[type^="date"], [type="month"]')

        if (input) {
            const AirDatepicker = (await import('air-datepicker')).default
            const localeUrl = cdn.datepickerLang
            const locale = (await import(/* @vite-ignore */ localeUrl)).default.default
            const minDate = input.min ?? ''
            const maxDate = input.max ?? ''
            const timepicker = input.type === 'datetime-local'
            const monthView = input.type === 'month'
                ? {
                    view: 'months',
                    minView: 'months',
                    dateFormat: 'MMMM yyyy',
                    altFieldDateFormat: 'yyyy-MM'
                }
                : {}

            const attributes = [...input.attributes].filter(({ name }) => name.match(/(required|placeholder)/)).map(({ name, value }) => `${name}="${value}"`).join(' ')

            input.setAttribute('type', 'hidden')

            input.insertAdjacentHTML('afterend', `<input type="text" inputmode="none" ${attributes}>`)

            const inputText = this.element.querySelector('[type="text"]')

            if (input.id) {
                inputText.id = input.id + '-datepicker'
            }

            inputText.addEventListener('keydown', e => {
                const key = e.key.toLowerCase()

                if (key !== 'backspace' && key !== 'tab') {
                    e.preventDefault()
                } else if (key === 'backspace') {
                    this.datepicker.clear()
                    inputText.dispatchEvent(new Event('change', { bubbles: true }))
                }
            })

            this.datepicker = new AirDatepicker(inputText, {
                locale,
                timepicker,
                minDate,
                maxDate,
                startDate: input.value,
                selectedDates: input.value,
                altField: input,
                autoClose: true,
                container: this.element,
                minutesStep: 5,
                altFieldDateFormat: 'yyyy-MM-dd',
                buttons: ['today', 'clear'],
                ...monthView,
                ...this.dateOptionsValue,
                onRenderCell: ({ date, cellType }) => {
                    if (cellType === 'day' && this.dateDisabledValue.includes(this.datepicker.formatDate(date, 'yyyy-MM-dd'))) {
                        return {
                            disabled: true
                        }
                    }
                },
                onShow: () => {
                    this.datepicker.$datepicker.querySelectorAll('.air-datepicker-button').forEach(element => {
                        element.setAttribute('type', 'button')
                        element.setAttribute('tabindex', '-1')
                    })
                },
                onSelect: ({ date }) => {
                    input.dispatchEvent(new Event('change', { bubbles: true }))
                }
            })
        }
    }

    async typeColor () {
        if (this.element.querySelector('[type="color"]') !== null) {
            const Pickr = (await import('@simonwep/pickr')).default
            const input = this.element.querySelector('input')

            await importStyle(cdn.pickrCss)

            input.setAttribute('inputmode', 'none')
            input.setAttribute('type', 'text')
            input.setAttribute('maxlength', '9')
            input.setAttribute('pattern', '^#?([a-fA-F0-9]{8}|[a-fA-F0-9]{6}|[a-fA-F0-9]{3})$')

            this.element.insertAdjacentHTML('afterbegin', '<div class="start"><div class="color"></div></div>')

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
                this.element.querySelector('.color').style['background-color'] = color.toHEXA().toString()
            }).on('hide', pickr => {
                pickr.applyColor()
                input.dispatchEvent(new Event('change', { bubbles: true }))
            })

            input.addEventListener('change', ({ target }) => {
                pickr.setColor(target.value)
            })
        }
    }

    typeNumber () {
        if (this.element.querySelector('[type="number"]') && !this.hasNumberTarget) {
            if (!this.element.querySelector('.end')) {
                this.element.insertAdjacentHTML('beforeend', '<div class="end"></div>')
            }

            this.element.querySelector('.end').insertAdjacentHTML('beforeend', `
                <div class="flex flex-col gap-0 justify-center -space-y-1 -me-0.5" data-ui-control-target="number">
                    <button class="focus-visible:text-accent" type="button" data-action="click->ui-control#stepUp">
                        <svg class="size-4"><use href="#icon-angle-up-solid"></use></svg>
                    </button>
                    <button class="focus-visible:text-accent" type="button" data-action="click->ui-control#stepDown">
                        <svg class="size-4"><use href="#icon-angle-down-solid"></use></svg>
                    </button>
                </div>
            `)
        }
    }

    stepUp () {
        this.element.querySelector('input:not([hidden])').stepUp()
        this.element.querySelector('input:not([hidden])').dispatchEvent(new Event('change', { bubbles: true }))
    }

    stepDown () {
        this.element.querySelector('input:not([hidden])').stepDown()
        this.element.querySelector('input:not([hidden])').dispatchEvent(new Event('change', { bubbles: true }))
    }

    showPicker () {
        this.element.querySelector('input:not([hidden])').showPicker()
    }

    showDatepicker () {
        this.datepicker.$el.focus()
    }
})
