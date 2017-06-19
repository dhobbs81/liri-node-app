/**
 * Module dependencies.
 */
var program = require('commander');
var twitterKeys = require('./keys.js');

program
    .version('0.0.1')
    .arguments('<cmd> [env]')
    .action(function (cmd, env) {
        switch (cmd) {
            case "my-tweets":
            case "spotify-this-song":
            case "movie-this":
            case "do-what-it-says":
                cmdValue = cmd;
                envValue = env;
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

if (!process.argv.slice(2).length) {
    program.outputHelp(function(text) { return text; });
}

if (typeof cmdValue === 'undefined') {
   console.error('no command given!');
   process.exit(1);
}
console.log('command:', cmdValue);
console.log('environment:', envValue || "no environment given");

// Print twitter keys
console.log(twitterKeys);
