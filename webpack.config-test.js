var webpack = require('webpack');
var path = require('path');

var isDev = JSON.stringify(process.env.NODE_ENV !== 'production');

module.exports = {
  mode: isDev ? 'development' : 'production',

  devServer: {
    host: 'localhost',
    port: '8081'
  },

  devtool: 'eval',

  entry: {
    'test': [`mocha-loader!./testRunner.js`]
  },

  output: {
    filename: 'test.js',
    publicPath: 'http://localhost:8081/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: ['babel-plugin-rewire']
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      '__DEV__': isDev
    })
  ]
};
