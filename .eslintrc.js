module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'airbnb',
    'plugin:storybook/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    semi: ['error', 'always'],
    'no-console': 1,
    'comma-dangle': ['error', 'only-multiline'],
    'multiline-ternary': 0,
    'react/jsx-props-no-spreading': 'off',
    'import/no-unresolved': 'off',
    'react/function-component-definition': 'off',
    'import/prefer-default-export': 'off',
    'object-curly-newline': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-confusing-arrow': 0,
    'implicit-arrow-linebreak': 0,
    'no-restricted-exports': 0,
  },
  overrides: [
    {
      // or whatever matches stories specified in .storybook/main.js
      files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
      rules: {
        // example of overriding a rule
        'storybook/hierarchy-separator': 'error',
        // example of disabling a rule
        'storybook/default-exports': 'off',
        'storybook/jsx-props-no-spreading': 'off',
      },
    },
  ],
};
