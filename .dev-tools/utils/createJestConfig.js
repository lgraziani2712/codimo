'use strict';

const paths = require('../config/paths');
const packageData = require(paths.appPackageJson);

const globals = {
  __VERSION__: packageData.version,
};
const moduleDirectories = ['node_modules'].concat(packageData.moduleRoots);

module.exports = (resolve, rootDir) => {
  const config = {
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: paths.coverageDirectory,
    globals,
    moduleDirectories,
    moduleNameMapper: {
      '^.+\\.(p?css|less|scss)$': resolve('config/jest/cssTransform.js'),
      '^.+\\.(gif|ttf|eot|svg)$': resolve('config/jest/fileTransform.js'),
      // FIXME @see https://github.com/facebook/jest/issues/553
      'blockly/blocks_compressed': `${paths.devElements}/test/__mocks__/blockly/blocks_compressed.js`,
      'blockly/javascript_compressed': `${paths.devElements}/test/__mocks__/blockly/javascript_compressed.js`,
      'blockly/msg/js/es': `${paths.devElements}/test/__mocks__/blockly/es.js`,
    },
    // setupFiles: [],
    testEnvironment: 'node',
    testPathIgnorePatterns: [
      '<rootDir>[/\\\\](build|docs|node_modules|scripts|.dev-tools)[/\\\\]',
    ],
    testRegex: 'src/.*\\.test\\.jsx?$',
    testURL: 'http://localhost',
  };

  if (rootDir) {
    config.rootDir = rootDir;
  }

  return config;
};
