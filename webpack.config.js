var webpack = require("webpack");

var outputFilename;
if(process.env.NODE_ENV == "production") {
  outputFilename = "bundle-[hash].js"
} else {
  outputFilename = "bundle.js"
}

module.exports = {
  context: __dirname,

  entry: './app.js',

  output: {
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

  postcss: function (webpack) {
    return [
      require("postcss-import")({ addDependencyTo: webpack }),
      require("postcss-cssnext")()
    ]
  }
}
