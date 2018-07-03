require('dotenv').config();

var keys = require('./key.js');
var Twitter = require('twitter');
var SpotifyConstructor = require('node-spotify-api');

var spotify = new SpotifyConstructor(keys.spotify);

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    console.log(data); 
});

//Twitter is a constructor
var client = new Twitter(keys.twitter);
   
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        console.log(tweets);
    }

    console.log(tweets);
});