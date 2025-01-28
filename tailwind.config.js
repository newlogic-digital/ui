import winduum from 'winduum/plugin'
import containerQueries from '@tailwindcss/container-queries'

export default !process.argv.includes('emails')
    ? {
            darkMode: 'class',
            content: [
                './src/**/*.{js,html,latte}',
                './node_modules/winduum/src/**/*.js',
                './node_modules/winduum-stimulus/**/*.js'
            ],
            plugins: [
                winduum(),
                containerQueries
            ],
            corePlugins: {
                container: false
            },
            future: {
                hoverOnlyWhenSupported: true
            }
        }
    : {
            content: [
                './src/templates/emails/**/*.latte'
            ],
            corePlugins: {
                preflight: false,
                ringWidth: false,
                boxShadow: false,
                scrollSnapType: false,
                borderSpacing: false,
                transform: false,
                container: false
            },
            theme: {
                extend: {
                    screens: {
                        container: '648px'
                    },
                    colors: {
                        primary: 'var(--color-primary)',
                        main: 'var(--color-main)',
                        body: 'var(--color-body)'
                    },
                    spacing: {
                        container: 'var(--spacing-container)'
                    },
                    borderRadius: {
                        DEFAULT: 'var(--rounded)'
                    }
                }
            }
        }
