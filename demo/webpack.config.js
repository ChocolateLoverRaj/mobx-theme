const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './index.js',
  module: {
    rules: [{
      test: /\.lazy\.css$/i,
      use: [
        { loader: 'style-loader', options: { injectType: 'lazyStyleTag' } },
        'css-loader'
      ]
    }, {
      test: /\.tsx?$/,
      loader: 'ts-loader'
    }]
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  plugins: [new HtmlWebpackPlugin({ title: 'Mobx Theme Demo' })]
}
