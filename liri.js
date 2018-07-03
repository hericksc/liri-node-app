require('dotenv').config();
var keys = require('./key.js');
var Twitter = require('twitter');
var SpotifyConstructor = require('node-spotify-api');
var inquirer = require("inquirer");

// inquirer
//   .prompt([

//     {
//       type: "list",
//       message: "What would you like me to show you?",
//       choices: ["My Tweets", "Spotify-this-song", "movie-this"],
//       name: "Liri Options"
//     },
//     // Here we ask the user to confirm.
//     {
//       type: "confirm",
//       message: "Are you sure:",
//       name: "confirm",
//       default: true
//     }
//   ])
//   .then(function(inquirerResponse) {
//     // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
//     if (inquirerResponse.confirm) {

//       console.log("Your " + inquirerResponse.list + " is ready to display\n");
//     }
//     else {
//       console.log( inquirerResponse.choices );
//     }
//   });

// //Spotify as a constructor//
var spotify = new SpotifyConstructor(keys.spotify);
var search = process.argv[2];

spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data, ) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    else {
    (data) 
        return console.log(data)
    }
    // spotifyApi.getArtist(keys.spotify)
    // .then(function (data) {
    //     console.log('Artist information', data.body);
    // }, function (err) {
    //     console.error(err);
    // });
    // console.log(data);
    // console.log(query);
    // console.log(type);
});

//Twitter as a constructor
var client = new Twitter(keys.twitter);

var params = { screen_name: 'CavsCWRU', count: 20 };
client.get('statuses/user_timeline', params, function (error, tweets, response) {
    // client.get ('search/tweets', params,function (error,tweets,response) {
            if (!error) {
        console.log(tweets)
        console.log(response);
    }
    // console.log("created_at: " + JSON.parse(response).created_at);
    // console.log("text: " + JSON.parse(body).text);
    // console.log("user: " + JSON.parse(body).user);


    console.log(tweets);

    // switch(value){

    //     case "text":
    //          console.log('text');break;
    //     default:
    //          console.log('default');break;
    //  }

});

// // IMBD API// // This Omdb code works but when you add the twitter and Spotify API it will not work//

var fs = require("fs");
var request = require("request");

var movieName = process.argv[2];
//my API key obtained from omdb website//
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=9daca4e1";

console.log(queryUrl);

request(queryUrl, function (error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMdbRating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatos Rating: " + JSON.parse(body).Rotten_Tomatoes);
        console.log("Country Produced: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);

    }
});

// commands for Liri

// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`
