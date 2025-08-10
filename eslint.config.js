import airbnbBase from 'eslint-config-airbnb-base';
import jestPlugin from 'eslint-plugin-jest';

export default [
  {
    ignores: [
      "dist",
    ],
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      "no-console": "off",
      "import/extensions": "off",
    },
  },
  airbnbBase,
  jestPlugin.configs.recommended,
];
