module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // to enable features such as async/await
    project: './tsconfig.json',
  },
  ignorePatterns: ['node_modules/*', '.next/*', 'setup/*'],
  settings: { react: { version: 'detect' } },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'plugin:react/recommended', // React rules
    'plugin:react-hooks/recommended', // React hooks rules
    'plugin:jsx-a11y/recommended', // Accessibility rules
    'plugin:@typescript-eslint/recommended', // TypeScript rules
    'airbnb',
    'airbnb-typescript',
  ],
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      },
    ],
    'max-len': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-console': 'off',
    'no-nested-ternary': 'off',
  },
};
