import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';
import eslintPluginImport from 'eslint-plugin-import';

export default typescriptEslint.config(
  { ignores: ['*.d.ts', '**/coverage', '**/dist'] },
  {
    plugins: {
      import: eslintPluginImport,
      vue: eslintPluginVue,
    },
    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
      ...eslintPluginVue.configs['flat/recommended'],
    ],
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',

      // Vue rules
      'vue/multi-word-component-names': 'warn',
      'vue/no-v-html': 'off',
      'vue/html-self-closing': [
        'warn',
        {
          html: { void: 'always', normal: 'never', component: 'always' },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/define-emits-declaration': ['warn', 'type-based'],

      // Vue Composition API / Reactivity best practices
      'vue/no-mutating-props': 'error',
      'vue/no-setup-props-reactivity-loss': 'warn',
      'vue/define-props-declaration': 'warn',
      'vue/define-emits-declaration': 'warn',
      'vue/no-ref-as-operand': 'warn',
      'vue/no-reserved-props': 'error',
      'vue/no-v-model-argument': 'warn',
      'vue/require-name-property': 'warn',
      'vue/html-indent': [
        'warn',
        2,
        {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: true,
          ignores: [],
        },
      ],
      'vue/max-attributes-per-line': [
        'warn',
        {
          singleline: 3,
          multiline: { max: 1, allowFirstLine: false },
        },
      ],
      'vue/singleline-html-element-content-newline': 'warn',
      'vue/multiline-html-element-content-newline': 'warn',

      // Best practices
      eqeqeq: ['error', 'always'],
      'no-return-assign': ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-var': 'error',
      'prefer-const': 'warn',
      'no-duplicate-imports': 'error',
      'import/order': [
        'warn',
        {
          groups: [
            ['builtin', 'external', 'internal'],
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
        },
      ],

      // Code style
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      'comma-dangle': ['warn', 'always-multiline'],
      'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 0 }],
    },
  },
  eslintConfigPrettier,
);
