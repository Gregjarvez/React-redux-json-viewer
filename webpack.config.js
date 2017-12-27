const webpack = require('webpack');
const path = require('path');
const extractCssPlugins = require('extract-text-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const HtmlWebpackPlugin = require('html-webpack-plugin');

const hotReloadEntries = () => {
 return process.env.NODE_ENV === 'production' ? [] : [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
  ]
}

const hotModulePlugins = () => {
  return process.env.NODE_ENV === 'production' ? [] :  [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
}

 const config = {
  context  : __dirname,
  devtool  : 'cheap-module-eval-source-map',
  entry    : [
  ...hotReloadEntries(),
    './app/index.js'
  ],
  output   : {
    path      : path.join(__dirname, 'docs'),
    filename  : 'bundle.js',
    publicPath: '/'
  },
  resolve  : {
    extensions: ['.js', '.json', '.scss']
  },
  devServer: {
    hot               : true,
    historyApiFallback: true,
    contentBase       : '/docs',
    compress          : true
  },
  stats    : {
    colors : true,
    reasons: true,
    chunks : false
  },
  module   : {
    rules: [
      {
        test: /\.scss$/,
        use : ['css-hot-loader'].concat(extractCssPlugins.extract({
          fallback: 'style-loader',
          use     : ['css-loader', 'sass-loader']
        }))
      },
      {
        enforce: 'pre',
        use    : 'eslint-loader',
        exclude: /node_moduless/
      },
      {
        test   : /\.js$/,
        loader : 'babel-loader',
        exclude: /node_modules/
      },
      {
        test   : /\.jsx$/,
        loader : 'babel-loader',
        exclude: /node_modules/
      },
      {
        test  : /\.html$/,
        loader: 'html-loader'
      },
      {
        test  : /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins  : [
    ...hotModulePlugins(),
    new extractCssPlugins('style.css'),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/index.html'
    })
  ]
};

module.exports = config;
