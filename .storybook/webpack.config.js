/**
 * @author Luciano Graziani @lgraziani2712
 *
 * You can use this file to add your custom webpack plugins, loaders and anything you like.
 * This is just the basic way to add addional webpack configurations.
 * For more information refer the docs: https://goo.gl/qPbSyX
 *
 * IMPORTANT
 * When you add this file, we won't add the default configurations which is similar
 * to "React Create App". This only has babel loader to load JavaScript.
 */
// FIXME when https://github.com/storybooks/react-storybook/pull/637 is merged
const webpack = require('@kadira/storybook/node_modules/webpack');
const genDefaultConfig = require('@kadira/storybook/dist/server/config/defaults/webpack.config.js');

const paths = require('../.dev-tools/config/paths');
const pkg = require('../package.json');

const modules = ['node_modules'].concat(pkg.moduleRoots);
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  __VERSION__: JSON.stringify(pkg.version),
};

module.exports = (config, env) => {
  const storyBookBaseConfig = genDefaultConfig(config, env);

  storyBookBaseConfig.devtool = 'inline-source-map';
  storyBookBaseConfig.plugins.push(new webpack.DefinePlugin(GLOBALS));
  storyBookBaseConfig.resolve = {
    root: paths.appDirectory,
    modulesDirectories: modules,
    extensions: ['', '.js', '.jsx'],
  };
  // storyBookBaseConfig.externals = Object.assign({
  //   cheerio: 'window',
  //   jsdom: 'window',
  //   'react/addons': true,
  //   'react/lib/ExecutionEnvironment': true,
  //   'react/lib/ReactContext': 'window',
  // }, storyBookBaseConfig.externals);

  return storyBookBaseConfig;
};
