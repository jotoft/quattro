var fs = require('fs')
var request = require('request')

var activities;


fs.readFile('activities.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  activities = JSON.parse(data);
  activities = [{name : "bathing", keywords : ["Sunny"]}, {name : "skiing", keywords : ["Cloudy", "Rainy"]}];
});


activities = [{name : "bathing", keywords : ["Sunny"]}, {name : "skiing", keywords : ["Cloudy", "Rainy"]}];


function keyword_filter(words, activity)
{
  for(var i = 0; i < activity.keywords.length; i++ )
  {
    console.log(activity.keywords[i] + String(words.indexOf(activity.keywords[i])));
    if(words.indexOf(activity.keywords[i]) >= 0 ) {
     return true;
   }
  }
 return false;
}

function by_keywords(words)
{
  console.log(words);
  return JSON.stringify(activities.filter(function (activity) {return keyword_filter(words, activity)}));
}

exports.by_keywords = by_keywords;
