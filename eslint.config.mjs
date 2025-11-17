import { globalIgnores } from 'eslint/config';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const compat = new FlatCompat({
  baseDirectory: dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  globalIgnores(['**/dist']),

  ...compat.extends(
    'airbnb-base',
    'plugin:jest/recommended',
  ),

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },

    rules: {
      'no-console': 'off',
      'import/extensions': 'off',
      'jest/expect-expect': 'error',
    },
  },

  {
    files: ['eslint.config.mjs'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'import/no-unresolved': 'off',
    },
  },
];
