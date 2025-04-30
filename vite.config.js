import { defineConfig } from 'vite'
import core from '@newlogic-digital/core'

export default defineConfig({
    plugins: [
        core({
            css: {
                transformer: 'lightningcss'
            }
        })
    ]
})
