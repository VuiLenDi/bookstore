const wp = require('@cypress/webpack-preprocessor')

const webpackOptions = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: ['ts-loader', 'angular2-template-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.(html|scss)$/,
        loader: 'raw-loader',
        exclude: /\.async\.(html|scss)$/
      },
      {
        test: /\.async\.(html|scss)$/,
        loaders: ['file?name=[name].[hash].[ext]', 'extract']
      }
    ]
  }
}

const options = {
  webpackOptions
}

module.exports = wp(options)