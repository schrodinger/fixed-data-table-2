var path = require('path');
var webpack = require('webpack');
var resolvers = require('../build_helpers/resolvers');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isDev = process.env.NODE_ENV !== 'production';

module.exports = {

  devtool: 'source-map',

  entry: path.join(__dirname, 'client.js'),

  output: {
    path: path.resolve(__dirname, '../__site__/'),
    filename: isDev ? '[name].js' : '[name]-[hash].js',
    publicPath: '',
  },

  target: 'web',

  module: {
    loaders: [
      {
        test: /\.md$/,
        loader: [
          'html-loader?{"minimize":false}',
          path.join(__dirname, '../build_helpers/markdownLoader')
        ].join('!')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            path.join(__dirname, '../build_helpers/cssTransformLoader')
          ].join('!')
        })
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!less-loader'
        })
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
        query: { mimetype: 'image/png', name: 'images/[name]-[hash].[ext]' }
      }
    ]
  },

  resolve: {
    alias: {
      'fixed-data-table-2/css': path.join(__dirname, '../src/css'),
      'fixed-data-table-2': path.join(__dirname, '../src/FixedDataTableRoot')
    },
    plugins: [resolvers.resolveHasteDefines]
  },

  devServer: {
    host: '0.0.0.0'
  },

  plugins: [
    new ExtractTextPlugin(
      isDev ? '[name].css' : '[name]-[hash].css'
    ),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      // 'process.env.NODE_ENV': JSON.stringify('production'),
      '__DEV__': JSON.stringify(isDev || true)
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  );
}
