var path = require('path');
var webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

var isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDev ? 'development' : 'production',

  entry: path.join(__dirname, 'renderPath.js'),

  output: {
    path: path.resolve(__dirname, '../__site_prerender__/'),
    filename: 'renderPath.js',
    libraryTarget: 'commonjs2',
  },

  target: 'node',

  module: {
    rules: [
      {
        test: /\.md$/,
        loader: [
          'html-loader?{"minimize":false}',
          path.join(__dirname, '../build_helpers/markdownLoader'),
        ].join('!'),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: 'null-loader',
      },
      {
        test: /\.less$/,
        loader: 'null-loader',
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
        query: { mimetype: 'image/png', name: 'images/[name]-[hash].[ext]' },
      },
    ],
  },

  resolve: {
    alias: {
      'fixed-data-table-2/css': path.join(__dirname, '../src/css'),
      'fixed-data-table-2': path.join(__dirname, '../src/FixedDataTableRoot'),
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __DEV__: isDev,
    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  module.exports.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin()],
  };
}
