var express = require('express')
var request = require('request')

var weather = require('./weather')
var activities = require('./activities');

var app = express()


app.get('/', function (req, res) {
  res.sendfile('./index.html')
})

app.get('/test', function (req, res) {
 res.send(weather.forecast());
})

app.get('/activities/:city', function(req, res) {
 res.send(activities.by_location_and_keywords(req.params.city, weather.today()));
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
