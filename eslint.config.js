import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'

export default defineConfig([
  {
    plugins: { js },
    extends: [
      'js/recommended',
      stylistic.configs['recommended-flat'],
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    ignores: ['**/+.js'],
  },
])
