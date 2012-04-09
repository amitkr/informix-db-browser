
/**
 * Module dependencies.
 */

var port = 80;
var os = require('os');
var kreg = new RegExp("katoomba|psyche");

if (kreg.test(os.hostname())) {
	port = 8100;
}

var express = require('express')
//   , piler = require('piler')
  , handlers = require('./handlers')
  ;

var server = module.exports = express.createServer();

// var clientjs = piler.createJSManager();
// var clientcss = piler.createCSSManager();

// Configuration
server.configure(function(){
    server.set('views', __dirname + '/views');
    server.set('view engine', 'jade');
    server.use(express.bodyParser());
    server.use(express.methodOverride());
    server.use(server.router);
    server.use(express.static(__dirname + '/public'));

    //clientjs.bind(server);
    //clientcss.bind(server);
});

server.configure('development', function(){
    //clientjs.liveUpdate(css);
    server.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

server.configure('production', function(){
    server.use(express.errorHandler()); 
});

// Routes

server.get('/', handlers.fun);

/*
clientjs.addOb({ "VERSION" : "0.0.1" });
clientjs.exec(function() {
    alert ("Hello " + window.navigator.appVersion);
});
*/

server.listen(port);
//console.log(server);
//console.log("Express server listening on port %d in %s mode", server.address().port, server.settings.env);
