import core from '@newlogic-digital/core'
import postcssHasPseudo from 'css-has-pseudo'
import postcssCustomSelectors from 'postcss-custom-selectors'

export default {
    plugins: [
        core({
            juice: {
                postcss: {
                    globalData: {
                        files: ['./src/emails/styles/main/Base/config.css']
                    }
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
