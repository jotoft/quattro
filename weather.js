var fs = require('fs')
var request = require('request')

fs.readFile('api_key', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
  var apikey = data;
  init_weather(apikey);
  init_forecast(apikey);
});

var weather_today;
var weather_forecast;

function init_forecast(apikey)
{
  gothenburg_forecast_request =  "http://api.openweathermap.org/data/2.5/forecast?id=2711533&appid=" + apikey
  request(gothenburg_forecast_request, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        weather_forecast = JSON.parse(body);
     }
    })
}

function init_weather(apikey)
{
  gothenburg_today_request =  "http://api.openweathermap.org/data/2.5/weather?id=2711533&appid=" + apikey
  request(gothenburg_today_request, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        weather_today = JSON.parse(body);
     }
    })
}



//maps api weather to our tags
function map_weather(weather_id)
{
  var major_weather_code = Math.floor(weather_id/100);
  switch(major_weather_code){
    case 2: return ["Rainy"] 
     break;
    case 3: return ["Rainy"] 
     break;
    case 5: return ["Rainy"] 
     break;
    case 6: return ["Snowy"]
     break;
    case 8: if(weather_id <= 801){
              return ["Sunny"]
            } else {
              return ["Cloudy"]
            }
     break;
    case 9: return ["Rainy"]
     break;
    default: return ["Unknowny"]
     break;
  }
}



function today()
{
  return map_weather(weather_today.weather[0].id);
}

function isNoon(forecast)
{
  return forecast.dt_txt.includes("12:00");
}

function forecast()
{
  
  noon_only =  weather_forecast.list.filter(isNoon);
  return noon_only.map(function (forecast) { return forecast.weather[0].id }).map(map_weather);
}


exports.today = today; 
exports.forecast = forecast;
