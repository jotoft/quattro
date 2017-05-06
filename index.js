var express = require('express')
var request = require('request')

var fs = require('fs')


fs.readFile('api_key', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
  var apikey = data;
  init_weather(apikey);
});

var weather_today;

function init_weather(apikey)
{
  gothenburg_today_request =  "http://api.openweathermap.org/data/2.5/weather?id=2711533&appid=" + apikey
  request(gothenburg_today_request, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        weather_today = body;
     }
    })
}


var app = express()


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/test', function (req, res) {
 res.send(weather_today);
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
