const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const nodeEnv = process.env.NODE_ENV ?? 'development';
const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDev ? 'development' : 'production',

  entry: path.join(__dirname, 'renderPath.js'),

  output: {
    path: path.resolve(__dirname, '../__site_prerender__/'),
    filename: 'renderPath.js',
    library: {
      type: 'commonjs2',
    },
  },

  target: 'node',

  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
            },
          },
          path.join(__dirname, '../build_helpers/markdownLoader'),
        ],
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
        type: 'asset/resource',
        generator: {
          filename: 'images/[name]-[contentHash].[ext]',
        },
      },
    ],
  },

  resolve: {
    alias: {
      'fixed-data-table-2/css': path.join(__dirname, '../src/css'),
      'fixed-data-table-2': path.join(__dirname, '../src/index'),
    },
    fallback: {
      url: false,
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
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
