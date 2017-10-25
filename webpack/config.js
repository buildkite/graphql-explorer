var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

if(!process.env.NODE_ENV) {
  throw "no NODE_ENV set";
}

var outputFilename;
if(process.env.NODE_ENV == "production") {
  outputFilename = "bundle-[hash].js";
} else {
  outputFilename = "bundle.js";
}

module.exports = {
  context: __dirname,

  entry: '../app.js',

  output: {
    path: path.join(__dirname, '..', 'dist'),
    publicPath: process.env.WEBPACK_HOST,
    filename: outputFilename
  },

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
      template: '../index.ejs',
      graphql: { url: process.env["GRAPHQL_ENDPOINT"]  || "https://graphql.buildkite.com/v1" }
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    })
  ]
};
