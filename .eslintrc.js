module.exports = {
  env: {
    es2022: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    'no-undef': 'off', // GJS has many globals
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'indent': ['error', 4],
    'no-trailing-spaces': 'error',
    'eol-last': 'error',
  },
  globals: {
    global: 'readonly',
    imports: 'readonly',
    log: 'readonly',
    logError: 'readonly',
    print: 'readonly',
    printerr: 'readonly',
    // GJS/GNOME globals
    ARGV: 'readonly',
    pkg: 'readonly',
    window: 'readonly',
  },
};
