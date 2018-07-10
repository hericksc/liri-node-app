require('dotenv').config();
var keys = require('./key.js');
var Twitter = require('twitter');
var SpotifyConstructor = require('node-spotify-api');
var fs = require("fs");
var request = require("request");


// //Spotify as a constructor//
var spotify = new SpotifyConstructor(keys.spotify);
//Twitter as a constructor
var client = new Twitter(keys.twitter);
var command = process.argv[2];
var search = process.argv[3];


var pick = function (caseData, functionData) {
    switch (caseData) {
        case "my-tweets":
            console.log('gonna search my tweets');
            var params = { screen_name: 'CavsCWRU', count: 20 };
            client.get('statuses/user_timeline', params, function (err, tweets) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                for (var i = 0; i < tweets.length; i++) {
                    console.log(tweets[i].created_at);
                    console.log(tweets[i].text);
                    console.log("--------------------");
                }
            });

            break;
        case "spotify-this-song":
            console.log('gonna spotify a song');

            spotify.search({ type: 'track', query: functionData || 'All the Small Things' }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                var songs = data.tracks.items;

                for (var i = 0; i < songs.length; i++) {
                    console.log(songs[i].name);
                    console.log(songs[i].album.name);
                    console.log("-------------------------");
                }

            });
            break;
        case "movie-this":
            console.log('gonna search for a movie');
            //my API key obtained from omdb website//
            var queryUrl = "http://www.omdbapi.com/?t=" + functionData + "&y=&plot=short&apikey=9daca4e1";

            console.log(queryUrl);

            request(queryUrl, function (err, response, body) {
                if (err) {
                    return console.log(err);
                }
                // If the request is successful
                if (response.statusCode === 200) {
                    var movie = JSON.parse(body);
                    // Parse the body of the site and recover just the imdbRating
                    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                    console.log("Title: " + movie.Title);
                    console.log("Release Year: " + movie.Year);
                    console.log("IMdbRating: " + movie.imdbRating);
                    console.log("Rotten Tomatoes Rating: " + movie.Rotten_Tomatoes);
                    console.log("Country Produced: " + movie.Country);
                    console.log("Language: " + movie.Language);
                    console.log("Plot: " + movie.Plot);
                    console.log("Actors: " + movie.Actors);

                }
            });

            break;
        case "do-what-it-says":
            console.log('gonna do what it says');


            var fileText = fs.readFileSync("./random.txt", "UTF8");
            var fileData = fileText.split(",");
            pick(fileData[0], fileData[1]);
            break;
        default:
            console.log("LIRI doesn't know that");


    }
};
pick(command, search);
















// var movieName = process.argv[2];

// });

