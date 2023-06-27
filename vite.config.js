import core from '@newlogic-digital/core'
import postcssHasPseudo from 'css-has-pseudo'
import postcssCustomSelectors from 'postcss-custom-selectors'

export default {
    plugins: [
        core({
            format: ['twig'],
            twig: {
                globals: {
                    template: './src/templates/Layout/Main.twig'
                }
            },
            tailwindcss: {
                nesting: {
                    noIsPseudoSelector: true
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
