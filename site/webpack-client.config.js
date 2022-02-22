var path = require('path');
var webpack = require('webpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

var isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDev ? 'development' : 'production',

  devtool: 'source-map',

  entry: path.join(__dirname, 'client.js'),

  output: {
    path: path.resolve(__dirname, '../__site__/'),
    filename: isDev ? '[name].js' : '[name]-[hash].js',
    publicPath: '',
  },

  target: 'web',

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
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev, // enable hot reload in development mode
              fallback: 'style-loader',
            },
          },
          'css-loader',
          path.join(__dirname, '../build_helpers/cssTransformLoader'),
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              fallback: 'style-loader',
            },
          },
          'css-loader',
          'less-loader',
        ],
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

  devServer: {
    static: path.resolve(__dirname, '../__site__/'),
    host: '0.0.0.0',
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name]-[hash].css',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      // 'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: isDev,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

if (process.env.NODE_ENV === 'production') {
  module.exports.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin()],
  };
}
