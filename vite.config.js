import { defineConfig } from 'vituum'
import core from '@newlogic-digital/core'
import postcssHasPseudo from 'css-has-pseudo'

export default defineConfig({
    integrations: [core()],
    postcss: {
        plugins: [postcssHasPseudo()]
    }
})
