import { Controller, LibStimulus } from '../Libraries/Stimulus.js'

LibStimulus.register('utils', class extends Controller {
    darkMode() {
        document.documentElement.classList.toggle('dark')
        localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    }
})
