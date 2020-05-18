var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var webpack = require('webpack')
// var bodyParser = require(       from 'body-parser')

var webpackConfig = require('./webpack.config.dev')
var devMiddleware = require('webpack-dev-middleware')
var hotmiddleware = require('webpack-hot-middleware')

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

if (process.env.NODE_ENV === 'production') {
  app.use('/public/images', express.static(path.join(__dirname, './public/production/public/images')))
  app.use('/public/fonts', express.static(path.join(__dirname, './public/production/public/fonts')))
  app.use('/bundle.js', express.static(path.join(__dirname, './public/production/bundle.js')))
}

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
