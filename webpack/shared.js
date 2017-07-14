const path = require('path');

module.exports = {
  entry: './src/main.js',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx$|\.js$/,
      loaders: ['babel'],
      include: path.resolve(__dirname, '../src')
    }, {
      id: 'style',
      test: /\.styl$/,
      loader: 'style!css!postcss!stylus',
      include: path.resolve(__dirname, '../styles')
    }, {
      id: 'css',
      test: /\.css$/,
      loader: 'style!css',
    }, {
      test: /\.woff2?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff',
      include: path.resolve(__dirname, '../assets')
    }, {
      test: /\.(eot|jpeg|jpg|png|svg|ttf|webp)$/,
      loader: 'file',
      include: path.resolve(__dirname, '../assets')
    }]
  }
};
