import cdn from '../Utils/cdn.js'
import { LibStimulus, Controller } from '../Libraries/Stimulus.js'
import { importStyle, inputStep, inputValidity } from '../Utils/Functions/+.js'

LibStimulus.register('ui-control', class extends Controller {
    async connect () {
        inputValidity(this.element, { validate: false })

        this.element.addEventListener('change', () => inputValidity(this.element))

        if (this.element.querySelector('select')) {
            return
        }

        await this.typeDate(this.element)

        await this.typeColor(this.element)
    }

    async typeDate () {
        const input = this.element.querySelector('[type^="date"], [data-type^="date"]')

        if (input) {
            const AirDatepicker = (await import('air-datepicker')).default
            const localeUrl = cdn.datepickerLang
            const locale = (await import(/* @vite-ignore */ localeUrl)).default.default
            const timepicker = input.getAttribute('type') === 'datetime-local'

            input.setAttribute('type', 'hidden')
            this.element.insertAdjacentHTML('beforeend', `<input type="text" readonly inputmode="none" ${input.required ? 'required' : ''} ${input.placeholder ? `placeholder="${input.placeholder}"` : ''}>`)

            const inputHidden = this.element.querySelector('[type="hidden"]')
            const inputText = this.element.querySelector('[type="text"]')

            new AirDatepicker(inputText, {
                locale,
                timepicker,
                startDate: inputHidden.value,
                selectedDates: inputHidden.value,
                altField: inputHidden,
                autoClose: true,
                container: this.element,
                minutesStep: 5,
                altFieldDateFormat: 'yyyy-MM-dd',
                buttons: ['today', 'clear']
            })
        }
    }

    async typeColor (element) {
        if (element.querySelector('[type="color"]') !== null) {
            const Pickr = (await import('@simonwep/pickr')).default
            const input = element.querySelector('input')

            await importStyle(cdn.pickrCss)

            element.setAttribute('data-type', 'color')
            element.querySelector('[type="color"]').setAttribute('inputmode', 'none')
            element.querySelector('[type="color"]').setAttribute('type', 'text')
            element.insertAdjacentHTML('afterbegin', '<div class="icon-l"><div class="color"></div></div>')

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

    increase () {
        inputStep(this.element.querySelector('input[type="number"]'), true)
    }

    decrease () {
        inputStep(this.element.querySelector('input[type="number"]'), false)
    }

    showPicker () {
        this.element.querySelector('input:not([hidden])').showPicker()
    }
})
