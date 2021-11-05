module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true,
  },
  extends: ['plugin:vue/vue3-essential', 'standard'],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],
  },
  overrides: [
    {
      files: ['src/api/**/*.ts'],
      rules: {
        camelcase: 'off',
      },
    },
  ],
}
