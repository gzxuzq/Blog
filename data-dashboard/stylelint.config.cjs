module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-order'],
  overrides: [
    {
      files: ['**/*.{vue,html}'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'color-hex-length': 'short',
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'order/properties-order': [],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'layer', 'variants', 'responsive', 'screen'],
      },
    ],
    'value-keyword-case': [
      'lower',
      {
        ignoreProperties: ['text-rendering'],
      },
    ],
  },
  ignoreFiles: ['node_modules/**/*', 'dist/**/*'],
}
