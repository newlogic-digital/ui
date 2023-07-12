module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,html,latte}',
    './app/**/*.latte',
    './node_modules/winduum/src/**/*.js'
  ],
  plugins: [
    require('winduum')()
  ]
}
