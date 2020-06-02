import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import webpack from 'webpack'
// import bodyParser             from 'body-parser'

import webpackConfig from './webpack.config.dev'
import devMiddleware from 'webpack-dev-middleware'
import hotmiddleware from 'webpack-hot-middleware'

var app = express()
const port = process.env.PORT || 1111

// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
// app.use(bodyParser.json({ limit: '50mb' }))

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig)
  app.use(devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
  }))
  app.use(hotmiddleware(compiler))
}

app.use('/js', express.static(path.join(__dirname, './public/js')))
app.use('/images', express.static(path.join(__dirname, './public/images')))
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './src/index.html'))
})

app.listen(port, err => {
  console.log(process.env.NODE_ENV + ': Server is running on port: ' + port)
  console.log('----------------------------------------------------------------------------------------------------------------------------------------')
  if (err) {
    console.log(err)
  }
})
