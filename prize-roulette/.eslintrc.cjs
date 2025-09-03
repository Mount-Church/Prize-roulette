// @ts-check
'use strict';

const { resolve } = require('node:path');

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.app.json',
  },
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
    '@typescript-eslint',
    'prettier',
    'only-warn',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: resolve(__dirname, 'tsconfig.app.json'),
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
  rules: {
    // React
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // TypeScript
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      { prefer: 'type-imports', disallowTypeAnnotations: false },
    ],

    // Import
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/first': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-duplicates': 'warn',
    'import/no-unresolved': 'off',

    // General
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'warn',
    'prefer-const': 'warn',
    'prefer-template': 'warn',
    'object-shorthand': 'warn',
    'no-unused-vars': 'off', // Handled by @typescript-eslint/no-unused-vars
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
      extends: ['plugin:testing-library/react'],
      rules: {
        'testing-library/no-node-access': 'off',
        'testing-library/no-container': 'off',
        'testing-library/render-result-naming-convention': 'off',
      },
    },
    {
      files: ['**/*.stories.tsx'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
  ignorePatterns: [
    'dist',
    'node_modules',
    'coverage',
    '*.d.ts',
    '*.generated.*',
    'vite.config.*',
    '**/__mocks__/**',
    '**/__fixtures__/**',
  ],
};
