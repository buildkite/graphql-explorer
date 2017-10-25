var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,

  entry: './app.js',

  module: {
    loaders: [
      {
        test: /\.css$/i,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.js$/i,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // We don't use flow, but graphiql renders a warning on webpack compile
      // without this:
      // https://github.com/graphql/graphiql/issues/617
      {
        test: /\.flow$/i,
        loader: 'babel-loader'
      },
      {
        test: /\.svg$/i,
        loader: 'url-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.ejs',
      graphql: { url: process.env["GRAPHQL_ENDPOINT"]  || "https://graphql.buildkite.com/v1" }
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    })
  ],

  output: {
    path: path.resolve(__dirname, 'dist')
  }
};
