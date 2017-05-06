var express = require('express')
var request = require('request')

var fs = require('fs')
var api_key 
var gothenburg_today_request;


fs.readFile('api_key', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
  api_key = data;
  gothenburg_today_request =  "http://api.openweathermap.org/data/2.5/weather?id=2711533&appid=" + api_key
});

var app = express()


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/test', function (req, res) {
  request(gothenburg_today_request, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        res.send(body) // Print the google web page.
     }
    })
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
