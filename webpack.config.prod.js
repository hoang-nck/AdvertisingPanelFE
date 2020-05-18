var webpack = require('webpack')
// var CleanWebpackPlugin = require('clean-webpack-plugin')
var config = require('./webpack.config.dev')

config.devtool = ''

// production env
config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
      SERVER_URL: JSON.stringify(process.env.SERVER_URL)
    }
  }),
  // new CleanWebpackPlugin(['dist']),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin()
]
config.optimization = {
  minimize: true
}

module.exports = config
