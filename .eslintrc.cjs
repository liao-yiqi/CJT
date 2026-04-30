module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier' // ❗必须放最后，关闭冲突规则
  ],
  rules: {
    // Vue规则（按需调整）
    'vue/multi-word-component-names': 'off',

    // TS规则（项目常用宽松）
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',

    // 关闭 Vue 强制格式（交给 Prettier）
    'vue/html-indent': 'off'
  }
}