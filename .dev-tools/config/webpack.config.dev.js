/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 */
'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { version, moduleRoots } = require('../../package');

const paths = require('./paths');

const modules = ['node_modules'].concat(moduleRoots);
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  __VERSION__: JSON.stringify(version),
};

module.exports = {
  // more info: https://webpack.js.org/configuration/devtool/
  // see https://github.com/webpack/webpack/issues/2145
  devtool: 'cheap-module-source-map',
  entry: [
    'babel-polyfill',
    paths.appMainJs,
  ],
  // necessary for https://webpack.github.io/docs/testing.html#compile-and-test
  target: 'web',
  context: paths.client,
  output: {
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'bundle.js',

    // Note: Physical files are only output by the production build task `npm run build`.
    path: paths.appDist,

    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,

    // necessary for HMR to know where to load the hot update chunks
    publicPath: '/',
  },
  resolve: {
    // This option let us to use "absolute path" for modules
    modules,
    extensions: ['.js', '.jsx'],
    alias: {
      core: paths.core,
      activities: paths.activities,
      client: paths.client,
    },
  },
  devServer: {
    historyApiFallback: true,

    // match the output path
    contentBase: paths.appDist,

    hot: true,
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    }, {
      test: /\.json$/,
      use: 'json-loader',
    }, {
      test: /\.(png|svg|jpg|gif|mp4)$/,
      use: 'file-loader',
    }],
  },
};
