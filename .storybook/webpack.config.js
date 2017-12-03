/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 */

const webpack = require('webpack');
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

const paths = require('../.dev-tools/config/paths');
const pkg = require('../package.json');

const modules = ['node_modules'].concat(pkg.moduleRoots);
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  __VERSION__: JSON.stringify(pkg.version),
};

module.exports = (config, env) => {
  const baseConfig = genDefaultConfig(config, env);

  baseConfig.devtool = 'cheap-module-source-map';
  baseConfig.plugins.push(new webpack.DefinePlugin(GLOBALS));
  baseConfig.resolve = {
    modules,
    extensions: ['.js', '.jsx'],
    alias: {
      core: paths.core,
      activities: paths.activities,
      client: paths.client,
    }
  };

  return baseConfig;
};
