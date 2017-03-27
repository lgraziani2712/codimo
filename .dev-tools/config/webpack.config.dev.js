'use strict';

const webpack = require('webpack');

const { version, moduleRoots } = require('../../package');

const paths = require('./paths');

const modules = ['node_modules'].concat(moduleRoots);
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  __VERSION__: JSON.stringify(version),
};

module.exports = {
  // more info: https://webpack.js.org/configuration/devtool/
  devtool: 'inline-source-map',
  entry: [
    // Used for async/await to work
    'babel-polyfill',
    paths.appMainJs,
  ],
  target: 'web', // necessary for https://webpack.github.io/docs/testing.html#compile-and-test
  context: paths.appSrc,
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
  },
  devServer: {
    historyApiFallback: true,

    // match the output path
    contentBase: paths.appDist,

    // hot: true,
  },
  plugins: [
    // Every time Webpack founds a variable like the above keys,
    // will import jquery. Usefull for libs that relay on jquery
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    // Rules are the new "loaders" new on webpack 2.beta-23
    // Instead of preLoaders and postLoaders you have to use
    //   enforce: 'pre',
    // or
    //   enforce: 'post',
    // inside a rule
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader'],
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.eot(\?v=\d+.\d+.\d+)?$/,
      loader: 'file-loader',
    }, {
      test: /\.woff2?$/,
      loader: 'file-loader?prefix=font/&limit=5000',
    }, {
      test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
      loader: 'file-loader?limit=10000&mimetype=application/octet-stream',
    }, {
      test: /\.svg(\?v=\d+.\d+.\d+)?$/,
      loader: 'file-loader?limit=10000&mimetype=image/svg+xml',
    }, {
      test: /\.(jpe?g|png|gif)$/i,
      loaders: ['file-loader'],
    }, {
      test: /\.ico$/,
      loader: 'file-loader?name=[name].[ext]',
    }, {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
    }],
  },
};
