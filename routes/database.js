var db = require('../model/db');

exports.play = function(req, res, next) {
    var user = req.param('user', 'informix');

    db.databases(res, user);

    res.end("Fun!");
    // next();
}

