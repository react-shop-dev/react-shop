import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import _import from 'eslint-plugin-import';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:prettier/recommended',
      'plugin:jsx-a11y/recommended',
      'eslint-config-prettier',
    ),
  ),
  {
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      prettier: fixupPluginRules(prettier),
      react: fixupPluginRules(react),
      'react-hooks': fixupPluginRules(reactHooks),
      import: fixupPluginRules(_import),
      'jsx-a11y': fixupPluginRules(jsxA11Y),
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.commonjs,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'commonjs',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      '@typescript-eslint/ban-ts-comment': [
        'warn',
        {
          'ts-ignore': 'allow-with-description',
          minimumDescriptionLength: 8,
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@mui/material',
              message:
                "Do not use named import from '@mui/material'. Use '@mui/material/<component-name>' instead",
            },
            {
              name: '@mui/icons-material',
              message:
                "Do not use named import from '@mui/icons-material'. Use '@mui/icons-material/<component-name>' instead",
            },
            {
              name: '@mui/lab',
              message:
                "Do not use named import from '@mui/lab'. Use '@mui/lab/<component-name>' instead",
            },
          ],

          patterns: ['@mui/material/*/*/*'],
        },
      ],
    },
  },
];
