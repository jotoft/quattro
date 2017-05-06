var express = require('express')
var request = require('request')

var weather = require('./weather')

var app = express()


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/test', function (req, res) {
 res.send(weather.forecast());
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
