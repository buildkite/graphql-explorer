var webpack = require("webpack"),
  HtmlWebpackPlugin = require('html-webpack-plugin');

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
    path: 'dist',
    filename: outputFilename
  },

  module: {
    loaders: [
      {
        test: /\.css$/i,
        loader: "style-loader!css-loader!postcss-loader"
      },
      {
        test: /\.js$/i,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        loaders: [
          'url-loader?limit=8192',
          'image-webpack?optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: '../index.html'
    })
  ],

  postcss: function (webpack) {
    return [
      require("postcss-import")({ addDependencyTo: webpack }),
      require("postcss-cssnext")()
    ]
  }
};
