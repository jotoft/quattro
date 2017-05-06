var fs = require('fs')
var request = require('request')

var activities;


fs.readFile('activities.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
   activities = JSON.parse(data).activities;
});

activities = [];
function keyword_filter(words, activity)
{
  for(var i = 0; i < activity.keyword.length; i++ )
  {
    console.log(activity.keyword[i] + String(words.indexOf(activity.keyword[i])));
    if(words.indexOf(activity.keyword[i]) >= 0 ) {
     return true;
   }
  }
 return false;
}

function by_keywords(words)
{
  console.log(words);
  console.log(activities);
  return JSON.stringify(activities.filter(function (activity) {return keyword_filter(words, activity)}));
}

function by_location_and_keywords(loc, words)
{
  city_filtered = activities.filter(function (activity) {return activity.city === loc});
  return city_filtered.filter(function (activity) {return keyword_filter(words, activity)})
}

exports.by_keywords = by_keywords;
exports.by_location_and_keywords = by_location_and_keywords;
