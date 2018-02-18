/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 */
'use strict';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}
const devTools = resolveApp('.dev-tools');

module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:flowtype/recommended',
  ],
  plugins: [
    'filenames',
    'flowtype',
    'import',
    'react',
  ],
  settings: {
    flowtype: ['onlyFilesWithFlowAnnotation'],
    'import/ignore': [
      'node_modules',                           // mostly CommonJS (ignored by default)
      /\.json$/,                                // can't parse JSON
      /\.(scss|less|css|pcss)$/,                // can't parse unprocessed CSS modules, either
      /\.(jpe?g|png|gif|ico)$/,                 // can't parse images
      /\.svg(\?v=\d+.\d+.\d+)?$/,               // can't parse images
      /\.eot(\?v=\d+.\d+.\d+)?$/,               // can't parse fonts
      /\.(woff|woff2|ttf(\?v=\d+.\d+.\d+)?)$/,  // can't parse fonts
    ],
    'import/resolver': {
      webpack: {
        config: `${devTools}/config/webpack.config.dev.js`,
      },
    },
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      classes: true,
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'array-bracket-spacing': 1,
    'array-callback-return': 1,
    'arrow-body-style': 1,
    'arrow-parens': 0,
    'arrow-spacing': 1,
    'brace-style': [1, '1tbs', { allowSingleLine: true }],
    camelcase: 2,
    'comma-dangle': [1, {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
    }],
    'comma-spacing': [1, { before: false, after: true }],
    'comma-style': 1,
    curly: [1, 'all'],
    'dot-notation': 1,
    'eol-last': 0,
    eqeqeq: 1,
    'generator-star-spacing': [1, { before: false, after: true }],
    indent: [1, 2],
    'key-spacing': 1,
    'keyword-spacing': 1,
    'linebreak-style': 1,
    'max-len': [2, { code: 100, comments: 100 }],
    'new-cap': [1, { properties: false }],
    'newline-after-var': 1,
    'newline-before-return': 1,
    'no-whitespace-before-property': 1,
    'no-alert': 0,
    'no-array-constructor': 2,
    'no-case-declarations': 2,
    'no-confusing-arrow': [1, { allowParens: true }],
    'no-console': 1,
    'no-const-assign': 1,
    'no-debugger': 1,
    'no-dupe-class-members': 2,
    'no-floating-decimal': 1,
    'no-irregular-whitespace': 2,
    'no-iterator': 1,
    'no-lone-blocks': 0,
    'no-loop-func': 2,
    'no-magic-numbers': [2, { ignoreArrayIndexes: true }],
    'no-multi-spaces': 1,
    'no-multiple-empty-lines': [1, { max: 1 }],
    'no-new-object': 1,
    'no-nested-ternary': 2,
    'no-param-reassign': 1,
    'no-template-curly-in-string': 2,
    'no-trailing-spaces': 1,
    'no-underscore-dangle': [2, { allow: ['_id', '_rev'] }],
    'no-unneeded-ternary': [1, { defaultAssignment: false }],
    'no-unused-vars': [2, { ignoreRestSiblings: true }],
    'no-useless-concat': 1,
    'no-useless-constructor': 1,
    'no-useless-escape': 1,
    'no-var': 1,
    'object-curly-spacing': [1, 'always'],
    'object-property-newline': 1,
    'object-shorthand': 1,
    'one-var': [2, 'never'],
    'padded-blocks': [1, 'never'],
    'prefer-arrow-callback': 1,
    'prefer-const': 1,
    'prefer-rest-params': 1,
    'prefer-template': 1,
    'quote-props': [1, 'as-needed'],
    quotes: [1, 'single'],
    semi: [1, 'always'],
    'space-before-blocks': 1,
    'space-in-parens': 1,
    'space-infix-ops': 1,
    'space-unary-ops': 1,
    'template-curly-spacing': 1,
    'valid-jsdoc': [2, {
      prefer: {
        returns: 'return',
        arg: 'param',
        argument: 'param',
        constructor: 'class',
      },
    }],
    //////////////////////
    // Filenames
    //////////////////////
    'filenames/match-exported': 2,
    //////////////////////////
    // Flow Type
    //////////////////////////
    'flowtype/delimiter-dangle': [1, 'always-multiline'],
    'flowtype/semi': [1, 'always'],
    'flowtype/space-after-type-colon': [1, 'always'],
    //////////////////////////
    // Import/Export
    //////////////////////////
    'import/extensions': [1, { js: 'never', json: 'always' }],
    'import/imports-first': 1,
    'import/newline-after-import': 1,
    'import/no-anonymous-default-export': [2, { allowObject: true, allowArray: true }],
    'import/no-deprecated': 2,
    'import/no-duplicates': 2,
    'import/no-mutable-exports': 1,
    'import/prefer-default-export': 2,
    'import/order': [2, {
      'newlines-between': 'always',
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
      ],
    }],
    //////////////////////////
    // React
    //////////////////////////
    'react/display-name': [2, { ignoreTranspilerName: false }],
    'react/forbid-prop-types': [2, { forbid: ['any'] }],
    'react/jsx-boolean-value': [1, 'always'],
    'react/jsx-closing-bracket-location': 1,
    'react/jsx-curly-spacing': 1,
    'react/jsx-filename-extension': [2, { extensions: ['.jsx'] }],
    'react/jsx-indent-props': [1, 2],
    'react/jsx-indent': [1, 2],
    'react/jsx-key': 2,
    'react/jsx-max-props-per-line': 0,
    'react/jsx-no-bind': [2, { ignoreRefs: true, allowArrowFunctions: true }],
    'react/jsx-no-duplicate-props': 2,
    'react/jsx-no-literals': 2,
    'react/jsx-no-undef': 2,
    'react/jsx-pascal-case': 2,
    'react/jsx-sort-prop-types': 0,
    'react/jsx-sort-props': 0,
    'react/jsx-tag-spacing': [1, { beforeSelfClosing: 'always' }],
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/jsx-wrap-multilines': 1,
    'react/no-array-index-key': 2,
    'react/no-danger': 2,
    'react/no-did-mount-set-state': 2,
    'react/no-did-update-set-state': 2,
    'react/no-direct-mutation-state': 2,
    'react/no-multi-comp': 2,
    'react/no-string-refs': 2,
    'react/no-unknown-property': 1,
    'react/prefer-es6-class': 2,
    'react/prefer-stateless-function': 2,
    // 'react/prop-types': 2,
    'react/react-in-jsx-scope': 2,
    'react/self-closing-comp': 1,
    'react/sort-comp': [1, {
      order: [
        'type-annotations',
        'defaultProps',
        'static-methods',
        'lifecycle',
        'everything-else',
        'render',
      ],
    }],
  },
  globals: {
    __VERSION__: true,
    process: true,
    Blockly: true,
  },
};
