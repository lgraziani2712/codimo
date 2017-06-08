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

module.exports = {
  appDist: resolveApp('dist'),
  appHtml: resolveApp('dev-elements/index.html'),
  appMainJs: resolveApp('src/main'),
  appPackageJson: resolveApp('package.json'),
  appPublic: resolveApp('public'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  devElements: resolveApp('dev-elements'),
  testsSetup: resolveApp('src/setupTests.js'),
  yarnLockFile: resolveApp('yarn.lock'),
};
