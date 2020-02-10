const path = require('path');
const DisableOutputWebpackPlugin = require('./disable-output-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: ['./projects/tanbo/ui/src/assets/fonts/style.css']
  },
  output: {
    path: path.resolve(__dirname, './dist/tanbo/ui/')
  },
  optimization: {
    minimize: false
  },

  module: {
    rules: [{
      test: /\.s?css$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }, 'extract-loader', 'css-loader', {
        loader: 'postcss-loader',
        options: {
          plugins() {
            return [require('autoprefixer')];
          }
        }
      }, 'sass-loader']
    }, {
      test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 0,
          name: '/dist/[name].[ext]'
        }
      }],
    }]
  },
  plugins: [
    // new DisableOutputWebpackPlugin(/template/),
  ]
};
