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
const NOT_EXIST = -1;
const foldersToClean = [
  `${paths.appDist}/*.js`,
  `${paths.appDist}/*.js.map`,
  `${paths.appDist}/*.html`,
  `${paths.appDist}/*.svg`,
  `${paths.appDist}/*.png`,
  `${paths.appDist}/*.gif`,
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
  context: paths.client,
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
        module.context && module.context.indexOf('node_modules') !== NOT_EXIST
      ),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: '404.html',
      template: paths.fourOhFour,
    }),
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
      test: /\.(png|svg|jpg|gif)$/,
      use: 'file-loader',
    }],
  },
};
