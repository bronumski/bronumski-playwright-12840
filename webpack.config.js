const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {

  return {
    mode: argv.mode,
    entry: {
      'index': './src/index.ts'
    },
    devtool: false,
    target: ['web', 'es3'],

    plugins: [
      new webpack.ProgressPlugin(),
    ],

    resolve: {
      extensions: ['.ts', '.js', '.json']
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },

    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: true,
          parallel: true,
          //sourceMap: true, // Must be set to true if using source-maps in production
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            compress: {
              drop_console: true,
            },
          }
        }),
      ],
    },

    output: {
      clean: false,
      filename: '[name].js',
      path: path.resolve(__dirname, 'build/dist'),
    }
  };
}
