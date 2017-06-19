/**
 * Module dependencies.
 */
var twitterKeys = require('./keys');
var program = require('commander');
var Twitter = require('twitter');

/**
 * Initialize the command line application usage and parameters
 */
program
    .version('0.0.1')
    .arguments('<cmd> [env]')
    .action(function (cmd, env) {
        console.log('command:', cmd);
        console.log('environment:', env || "no environment given");
        switch (cmd) {
            case "my-tweets":
                cmdFunc = tweets;
                break;
            case "spotify-this-song":
                cmdFunc = spotify;
                break;
            case "movie-this":
                cmdFunc = movie;
                break;
            case "do-what-it-says":
                cmdFunc = parseCmds;
                break;
            default:
                break;
        }
    })
    .on('--help', function() {
        console.log('  Commands:');
        console.log('');
        console.log('    my-tweets');
        console.log('    spotify-this-song');
        console.log('    movie-this');
        console.log('    do-what-it-says');
        console.log('');
    })
    .parse(process.argv);

// If the user did not provide any information on the command line,
// print the usage text
if (!process.argv.slice(2).length) {
    program.outputHelp(function(text) { return text; });
}

// If no commands were given by the user, that's an error
if (typeof cmdFunc === 'undefined') {
   console.error('no command given!');
   process.exit(1);
}

//
// This function displays the user's tweets
//
function tweets() {
    // Print twitter keys for debug
    console.log(twitterKeys);

    // Initialize the Twitter API
    var client = new Twitter(twitterKeys);

    // Get tweets from the user's timeline and log them to the console.
    var params = {screen_name: 'ljkhfla', count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
        console.log(tweets);
    });
}

// Execute the command given by the user as a command line parameter
cmdFunc.apply(null, arguments);
