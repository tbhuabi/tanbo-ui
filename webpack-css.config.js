const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DisableOutputWebpackPlugin = require('./disable-output-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    index: ['./projects/tanbo/ui/src/assets/scss/index.scss', './projects/tanbo/ui/src/assets/fonts/style.css']
  },
  output: {
    path: path.resolve(__dirname, 'dist/tanbo/ui/')
  },
  module: {
    rules: [{
      test: /\.ts$/,
      loader: ['ts-loader']
    }, {
      test: /\.s?css$/,
      loader: [MiniCssExtractPlugin.loader, 'css-loader', {
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
          limit: 100000
        }
      }],
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.min.css'
    }),
    new DisableOutputWebpackPlugin(/index\.js/)
  ]
};
