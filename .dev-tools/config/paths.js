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
  activities: resolveApp('activities'),
  appDist: resolveApp('dist'),
  appHtml: resolveApp('dev-elements/index.html'),
  appMainJs: resolveApp('client/main'),
  appPackageJson: resolveApp('package.json'),
  appPublic: resolveApp('public'),
  appNodeModules: resolveApp('node_modules'),
  client: resolveApp('client'),
  core: resolveApp('core'),
  coverageDirectory: resolveApp('coverage'),
  devElements: resolveApp('dev-elements'),
  fourOhFour: resolveApp('dev-elements/404.html'),
  yarnLockFile: resolveApp('yarn.lock'),
};
