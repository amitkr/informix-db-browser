var db = require('../model/db');

exports.play = function(req, res, next) {
    var user = req.param('user', '%');
    var tname = req.param('tname', '%');

    db.tables(res, user, tname);

    res.end("Fun!");
    // next();
}
