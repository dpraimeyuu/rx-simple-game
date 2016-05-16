var path = require('path');
var webpack = require('webpack');

var ENV = process.env.NODE_ENV;

module.exports = {
  entry: ( ENV == 'production' ?
           ['./main']
           :
           [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/dev-server',
            './main'
           ]
  ),
  output: {
    filename: './dist/bundle.js'
  },
  devtool: ENV == 'production'? 'source-map' : 'cheap-module-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: __dirname,
        exclude: /node_modules/
      }
    ]
  },
  plugins: ( ENV == 'production' ?
             [
              new webpack.optimize.UglifyJsPlugin({minimize: true}),
             ]
             :
             [new webpack.HotModuleReplacementPlugin()]
  ),
  devServer: {
    contentBase: './',
    hot: true
  }
};
