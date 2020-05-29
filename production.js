var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
// var bodyParser = require(       from 'body-parser')

var app = express()
const port = process.env.PORT || 80

// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
// app.use(bodyParser.json({ limit: '50mb' }))

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use('/js', express.static(path.join(__dirname, './public/js')))

app.use('/images', express.static(path.join(__dirname, './public/images')))

app.use('/public/images', express.static(path.join(__dirname, './dist/public/images')))
app.use('/public/fonts', express.static(path.join(__dirname, './dist/public/fonts')))
app.use('/bundle.js', express.static(path.join(__dirname, './dist/bundle.js')))

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
