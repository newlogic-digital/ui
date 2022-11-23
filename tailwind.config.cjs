const { tailwindColors, tailwindVariables, tailwindColorsAccent, tailwindColorsCurrent, tailwindAnimations, tailwindRadius } = require('@vituum/tailwind/helpers.cjs')
const plugin = require('tailwindcss/plugin')

const colors = [
  'background', 'default', 'invert', 'light', 'dark', 'primary', 'secondary',
  'warning', 'error', 'info', 'success', 'accent'
]

const radius = ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', 'full']

const animations = [
  'fade-in', 'fade-out'
]

module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,html,twig}'
  ],
  corePlugins: {
    preflight: false,
    container: false,
    ringWidth: false,
    ringColor: false,
    ringOpacity: false,
    ringOffsetWidth: false,
    ringOffsetColor: false,
    gradientColorStops: false,
    backgroundImage: false,
    accentColor: false,
    borderRadius: false
  },
  theme: {
    extend: {
      colors: tailwindColors(colors),
      fontFamily: tailwindVariables('font', ['primary', 'secondary']),
      fontWeight: tailwindVariables('font', ['light', 'normal', 'medium', 'semibold', 'bold', 'extrabold']),
      zIndex: tailwindVariables('z', [10, 20, 30, 40, 50, 60], {
        0: 0,
        auto: 'auto'
      }),
      spacing: tailwindVariables('spacing', ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', 'section']),
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
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities(tailwindColorsAccent(colors))
    }),
    plugin(({ addUtilities }) => {
      addUtilities(tailwindColorsCurrent(colors))
    }),
    plugin(({ addUtilities }) => {
      addUtilities(tailwindAnimations(animations))
    }),
    plugin(({ addUtilities }) => {
      addUtilities(tailwindRadius(radius))
    })
  ],
}
