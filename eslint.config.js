import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
    settings: {
      'import/resolver': {
          node: {
              extensions: ['.js', '.vue', '.ts', '.d.ts'],
          },
          alias: {
              extensions: ['.vue', '.js', '.ts', '.scss', '.d.ts'],
              map: [
                  ['@/components', './src/components'],
                  ['@/pages', './src/pages'],
                  ['@/router', './src/router'],
                  ['@/store', './src/store'],
                  ['@/styles', './src/styles'],
                  ['@/types', './src/types'],
                  ['@/utils', './src/utils'],
              ],
          },
      },
  },
  },
)
