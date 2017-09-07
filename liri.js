var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var fs = require("fs");
var action = process.argv[2];
var nodeArgs = process.argv;
var itemName = "";
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 2 && i < nodeArgs.length) {
            itemName = itemName + "+" + nodeArgs[i];
        }
        else {
            itemName += nodeArgs[i];
        }
    }
    

var client = new Twitter(keys.twitterKeys);
function myTweets(){
    var params = 
    {
        screen_name: '@tenstages',
        count: 20
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
        for (var i=0; i<tweets.length; i++){    
            console.log(
            "\n" + 
            "Created: " + tweets[i].created_at +
            "\nUserhandle: " + tweets[i].user.screen_name +
            "\nTweet: " + tweets[i].text +
            "\n=============================================" + 
            "\n");
            }
        }
    });
}

function spotifySong(){
    var spotify = new Spotify(keys.spotifyKeys);
       
    spotify.search({ type: 'track', query: 'All the Small Things'}, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
        }
        
        // var songData = data;

        for (var i=0; i<data.tracks.items.length; i++)
        console.log( 
            "\n" +
            "\nArtist: " + data.tracks.items[i].artists[0].name +
            "\nTrack Name: " + data.tracks.items[i].name + 
            "\nAlbum: " + data.tracks.items[i].album.name +
            "\nExternal URL: " + data.tracks.items[i].href + 
            "\n=============================================" +
            "\n"
        ); 
    
    });

};




function omdbMovie(){
    var queryUrl = "http://www.omdbapi.com/?t=" + itemName + "&y=&plot=short&apikey=40e9cece";

    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(
                "\n" +
                "\nTitle: " + JSON.parse(body).Title +
                "\nRelease Year: " + JSON.parse(body).Year +
                "\nIMDB Rating: " + JSON.parse(body).imdbRating +
                "\nRotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value +
                "\nCountry Produced: " + JSON.parse(body).Country +
                "\nLanguage(s): " + JSON.parse(body).Language +
                "\nPlot: " + JSON.parse(body).Plot +
                "\nActors: " + JSON.parse(body).Actors +
                "\n======================================="
                
            );
        }
    });
};

function doWhat(){
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error){
            return console.log("error")
        }
        else
            console.log(data)
    })
}; 


switch (action) {
    case "my-tweets":
      myTweets();
      break;
  
    case "spotify-this-song":
      spotifySong();
      break;
  
    case "movie-this":
      omdbMovie();
      break;
  
    case "do-what-it-says":
      doWhat();
      break;
  }