import winduum, { defaultConfig } from 'winduum/plugin/tailwind.js'
import containerQueries from '@tailwindcss/container-queries'

export default !process.argv.includes('emails')
    ? {
        darkMode: 'class',
        content: [
            'index.html',
            './src/**/*.{js,html,latte}',
            './app/**/*.latte',
            './node_modules/winduum/src/**/*.js'
        ],
        plugins: [
            winduum({
                settings: {
                    rgb: true
                },
                spacing: [...defaultConfig.spacing, 'section']
            }),
            containerQueries
        ]
    }
    : {
        content: [
            './src/emails/**/*.latte'
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
                    container: '548px'
                },
                colors: {
                    primary: 'rgb(var(--color-primary))',
                    light: 'rgb(var(--color-light))',
                    main: 'rgba(var(--color-main))'
                },
                spacing: {
                    container: 'var(--spacing-container)',
                    'container-inner': 'var(--spacing-container-inner)'
                }
            }
        }
    }
