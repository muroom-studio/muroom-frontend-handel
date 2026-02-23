import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import onlyWarn from 'eslint-plugin-only-warn';
import prettierPlugin from 'eslint-plugin-prettier';
import tailwindcssPlugin from 'eslint-plugin-tailwindcss';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
      prettier: prettierPlugin,
      tailwindcss: tailwindcssPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
      'prettier/prettier': 'error',
      'tailwindcss/classnames-order': 'error',
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ['dist/**'],
  },
];
