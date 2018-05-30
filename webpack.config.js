const webpack = require('webpack')
const path = require('path');
module.exports = {
  // 入口
  entry: './renderer.js',
  // 输出
  output: {
    //path: './dist',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dev-dist',
    filename: 'renderer.js'
  },
  module: {
    rules: [

    ]
  },
  plugins: [

  ],
  devtool: 'eval-source-map',
  mode: 'production'
}
