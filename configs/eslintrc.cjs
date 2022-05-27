module.exports = {
  extends: [
    'airbnb-base',
    'plugin:yaml/recommended',
  ],
  plugins: [
    'yaml',
  ],
  root: true,
  ignorePatterns: [
    'node_modules',
    '*.doccarchive',
    '!.github',
  ],
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 13,
    impliedStrict: true,
  },
  rules: {
    'import/no-unresolved': 0, // https://github.com/import-js/eslint-plugin-import/issues/1810
    'import/extensions': 0, // extensions always required
    'arrow-body-style': 0,
    'no-param-reassign': 1,
    'class-methods-use-this': 0,
    'max-classes-per-file': 0,
    'no-restricted-syntax': 0,
    'object-curly-newline': 0,
    'max-len': 0,
    'function-paren-newline': 0,
    'no-useless-return': 0,
    'no-continue': 0,
    'no-console': 0,
    'no-underscore-dangle': 0,
  },
  overrides: [
    {
      files: ['*.test.js'],
      rules: {
        'no-param-reassign': 0,
      },
    },
  ],
};
