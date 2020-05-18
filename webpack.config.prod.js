/**
 * Created by HoangNck on 12/08/19.
 */
import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'

import config from './webpack.config.dev'

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
  new CleanWebpackPlugin(['dist']),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    mangle: true,
    compress: {
      warnings: false, // Suppress uglification warnings
      // pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      screw_ie8: true
    },
    output: {
      comments: false
    },
    exclude: [/\.min\.js$/gi] // skip pre-minified libs
  })
]

module.exports = config
