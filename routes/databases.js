var db = require('../model/db');

exports.play = function(req, res, next) {
	console.log(req);
	console.log(next);
    var user = req.param('user', '%');
    var dbname = req.param('dbname', '%');

    db.databases(res, user, dbname);

    res.end("Fun!");
    // next();
}
