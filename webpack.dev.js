const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',

  devServer: {
    contentBase: './dist'
  },

  output: {
    filename: '[name]-bundle.js'
  }
});