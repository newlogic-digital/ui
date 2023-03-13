module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,html,twig}'
  ],
  corePlugins: {
    ringWidth: false,
    ringColor: false,
    ringOpacity: false,
    ringOffsetWidth: false,
    ringOffsetColor: false,
    gradientColorStops: false,
    backgroundImage: false
  },
  plugins: [
    require('winduum')({
      colors: ['invert'],
      screens: {
        m: { max: '47.9375em' },
        t: '48em',
        d: '60em',
        w: '76em',
        hd: '85em',
        mhd: '88em',
        fhd: '100em',
        touch: { max: '59.9375em' }
      }
    })
  ],
}
