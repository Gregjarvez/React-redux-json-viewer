const webpack = require('webpack');
const path = require('path');
const ExtractCssPlugins = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: 'cheap-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './app/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json', '.scss']
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: '/dist',
    compress: true,
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractCssPlugins.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }))
      },
      {
        enforce: 'pre',
        use: 'eslint-loader',
        exclude: /node_moduless/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractCssPlugins('style.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/index.html'
    })
  ]
};
