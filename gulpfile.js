import { defineConfig } from '@newlogic-digital/core'
import cms from "./src/module.cms.js"

export default defineConfig({
    config: true,
    modules: {cms},
    serve: {
        https: true
    },
    scripts: {
        importResolution: {
            directories: ['Components', 'Sections', 'Layout', 'Libraries', 'Utils/Functions', 'Ui']
        },
        importMap: {
            build: false,
            trailingSlashes: /(vanillajs-datepicker)/
        }
    },
    styles: {
        purge: {
            enabled: true,
            content: ['src/scripts/**/*.js', 'src/templates/**/*.twig', 'www/templates/**/*.tpl', 'temp/cdn/*.js', 'admin_ex/js/templates/*.html', 'index.html'],
            options: {
                safelist: {
                    standard: [/(class|is-|to-|grecaptcha)/],
                    deep: [/(ui-text|wsw|datepicker)/]
                }
            }
        },
        vendor: {
            path: 'Utils/vendor.css'
        },
        importResolution: {
            directories: ['Components', 'Sections', 'Layout', 'Libraries', 'Ui']
        },
        themePath: 'Utils/theme/{THEME}.{FORMAT}',
        postcss: {
            extend: []
        }
    }
})
