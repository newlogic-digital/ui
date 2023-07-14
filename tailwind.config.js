import winduum from 'winduum'

export default {
    darkMode: 'class',
    content: [
        './src/**/*.{js,html,latte}',
        './app/**/*.latte',
        './node_modules/winduum/src/**/*.js'
    ],
    plugins: [
        winduum()
    ]
}
