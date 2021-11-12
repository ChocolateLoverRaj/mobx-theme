const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './index',
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
    }, {
      test: /\.jsx$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
          plugins: ['react-require']
        }
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx']
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Mobx Theme Demo',
    template: './index.html'
  })]
}
