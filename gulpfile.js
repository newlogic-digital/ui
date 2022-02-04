import { defineConfig } from '@newlogic-digital/core'

export default defineConfig({
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
            content: ['src/scripts/**/*.js', 'src/templates/**/*.twig', 'www/templates/**/*.tpl', 'temp/cdn/*.js'],
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
