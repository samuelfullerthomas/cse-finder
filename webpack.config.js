module.exports = {
  entry: './src/cse-finder.js',
  output: {
    path: __dirname + '/chrome_extension',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' }
    ]
  }
}
