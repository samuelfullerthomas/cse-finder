module.exports = {
  entry: {
    popup: ['babel-polyfill', './src/popup.js'],
    options: './src/options.js'
  },
  output: {
    path: __dirname + '/chrome_extension',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
}
