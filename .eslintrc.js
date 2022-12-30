/*eslint-env node*/
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:jsx-a11y/recommended',
    // 'plugin:import/errors',
    // 'plugin:import/warnings',
    // 'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'import'
  ],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
      typescript: {
        config: 'tsconfig.json',
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off'
    // 'react/prop-types': ['off'],
    // 'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    // 'import/order': ['error'],
    // 'jsx-a11y/anchor-is-valid': ['off'],
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     trailingComma: 'all',
    //     endOfLine: 'lf',
    //     semi: false,
    //     singleQuote: true,
    //     printWidth: 80,
    //     tabWidth: 2,
    //   },
    // ],
  },
  "overrides": [
    {
      "files": ["**/*.tsx"],
      "rules": {
        "react/prop-types": "off"
      }
    }
  ]
}
