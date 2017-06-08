/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 */
'use strict';

process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const BabiliPlugin = require('babili-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { version, moduleRoots } = require('../../package');

const paths = require('./paths');

const modules = ['node_modules'].concat(moduleRoots);
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __VERSION__: JSON.stringify(version),
};
const foldersToClean = [
  `${paths.appDist}/*.js`,
  `${paths.appDist}/*.js.map`,
  `${paths.appDist}/*.html`,
];

module.exports = {
  // more info: https://webpack.js.org/configuration/devtool/
  devtool: 'cheap-module-source-map',
  entry: [
    // Used for async/await to work
    'babel-polyfill',
    paths.appMainJs,
  ],
  target: 'web', // necessary for https://webpack.github.io/docs/testing.html#compile-and-test
  context: paths.appSrc,
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',

    // Note: Physical files are only output by the production build task `npm run build`.
    path: paths.appDist,

    // necessary for HMR to know where to load the hot update chunks
    publicPath: '/',
  },
  resolve: {
    // This option let us to use "absolute path" for modules
    modules,
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
    // match the output path
    contentBase: paths.appDist,
    // hot: true,
  },
  plugins: [
    new CleanWebpackPlugin(foldersToClean, {
      root: paths.appDist,
    }),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.NoEmitOnErrorsPlugin(),
    new BabiliPlugin({}, {
      comments: false,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => (
        // this assumes your vendor imports exist in the node_modules directory
        module.context && module.context.indexOf('node_modules') !== -1
      ),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
    }),
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader'],
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }],
  },
};
