/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 */
/* eslint-disable max-len */
'use strict';

const paths = require('../config/paths');

const packageData = require(paths.appPackageJson);

const globals = {
  __VERSION__: packageData.version,
};
const moduleDirectories = ['node_modules'].concat(packageData.moduleRoots);

module.exports = (resolve, rootDir) => {
  const config = {
    collectCoverageFrom: [
      'activities/**/*.{js,jsx}',
      'client/**/*.{js,jsx}',
      'core/**/*.{js,jsx}',
    ],
    coverageDirectory: paths.coverageDirectory,
    globals,
    moduleDirectories,
    moduleNameMapper: {
      // aliases
      '^activities(.*)$': '<rootDir>/activities$1',
      '^client(.*)$': '<rootDir>/client$1',
      '^core(.*)$': '<rootDir>/core$1',
      // SEE: https://github.com/facebook/jest/issues/553
      'vendors/blockly/blocks_compressed': `${paths.devElements}/test/__mocks__/blockly/blocks_compressed.js`,
      'vendors/blockly/javascript_compressed': `${paths.devElements}/test/__mocks__/blockly/javascript_compressed.js`,
      'vendors/blockly/msg/js/es': `${paths.devElements}/test/__mocks__/blockly/es.js`,
    },
    testEnvironment: 'node',
    testPathIgnorePatterns: [
      '<rootDir>[/\\\\](build|docs|node_modules|scripts|.dev-tools)[/\\\\]',
    ],
    testRegex: '(activities|client|core)/.*\\.test\\.jsx?$',
    testURL: 'http://localhost',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
      // Image Files
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/.dev-tools/config/jest/fileTransform.js',
    },
  };

  if (rootDir) {
    config.rootDir = rootDir;
  }

  return config;
};
