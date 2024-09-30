// eslint.config.js
const { Linter } = require('eslint');
const typescriptEslintRecommended = require('@typescript-eslint/eslint-plugin')
  .configs.recommended;
const reactRecommended = require('eslint-plugin-react').configs.recommended;
const reactHooksRecommended = require('eslint-plugin-react-hooks').configs
  .recommended;
const jsxA11yRecommended = require('eslint-plugin-jsx-a11y').configs
  .recommended;
const prettierRecommended = require('eslint-config-prettier');

const config = [
  {
    files: [
      './app/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
      './lib/**/*.{js,jsx,ts,tsx}',
      './redux/**/*.{js,jsx,ts,tsx}',
      './utils/**/*.{js,jsx,ts,tsx}',
    ],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      react: require('eslint-plugin-react'),
      'react-hooks': require('eslint-plugin-react-hooks'),
      'jsx-a11y': require('eslint-plugin-jsx-a11y'),
    },
    rules: {
      ...typescriptEslintRecommended.rules,
      ...reactRecommended.rules,
      ...reactHooksRecommended.rules,
      ...jsxA11yRecommended.rules,
      ...prettierRecommended.rules,
      'react/prop-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'jsx-a11y/anchor-is-valid': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];

module.exports = config;
