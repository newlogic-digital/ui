import core from '@newlogic-digital/core'
import postcssHasPseudo from 'css-has-pseudo'
import postcssCustomSelectors from 'postcss-custom-selectors'

export default {
    plugins: [
        core({
            latte: {
                globals: {
                    template: './src/templates/Layout/Main.latte'
                }
            }
        })
    ],
    css: {
        postcss: {
            plugins: [postcssCustomSelectors(), postcssHasPseudo()]
        }
    }
}
