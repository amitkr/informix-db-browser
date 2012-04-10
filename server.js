
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
  , routes = require('./routes')
  ;

var server = module.exports = express.createServer();

// Configuration
server.configure(function(){
    server.set('views', __dirname + '/views');
    server.set('view engine', 'jade');
    server.use(express.bodyParser());
    server.use(express.methodOverride());
    // server.use(express.cookieParser());
    // server.use(express.session({ secret: 'your secret here' }));
    server.use(server.router);
    server.use(express.static(__dirname + '/public'));
});

server.configure('development', function(){
    server.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

server.configure('production', function(){
    server.use(express.errorHandler()); 
});

// Routes

server.get('/', routes.root);

server.get('/tables/:name', routes.tables);

server.listen(port, function () {
    //console.log(server);
    console.log("server listening on port %d in %s mode", server.address().port, server.settings.env);
});
