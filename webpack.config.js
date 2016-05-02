module.exports = {
  entry: ['babel-polyfill', './src/cse-finder.js'],
  output: {
    path: __dirname + '/chrome_extension',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
}
