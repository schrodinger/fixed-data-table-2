var webpack = require('webpack');
var resolvers = require('./build_helpers/resolvers');
var path = require('path');

module.exports = {
  resolve: {
    plugins: [resolvers.resolveHasteDefines]
  },
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
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?plugins=babel-plugin-rewire'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      '__DEV__': JSON.stringify(process.env.NODE_ENV !== 'production')
    })
  ]
};
