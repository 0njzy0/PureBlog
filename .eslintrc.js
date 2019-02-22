module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['standard', 'plugin:vue/recommended', 'prettier', 'prettier/standard', 'prettier/vue'],
  plugins: ['standard', 'vue', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        htmlWhitespaceSensitivity: 'ignore',
        semi: false,
        singleQuote: true,
        printWidth: 120
      }
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any'
        }
      }
    ],
    'vue/no-use-v-if-with-v-for': ['off'],
    'vue/component-name-in-template-casing': ['off'],
    'vue/name-property-casing': ['off'],
    'vue/no-unused-components': ['off'],
    eqeqeq: ['off'],
    'no-new': ['off']
  }
}
