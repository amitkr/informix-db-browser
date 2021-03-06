/**
 * Connection configurations
 */
var settings = JSON.parse(require('fs').readFileSync('./config/db_conf.json','utf8'));

/**
 * Create an Informix database nodejs object
 */
var bindings = require("nodejs-db-informix");

/**
 * Create a new Informix database bindings. Setup event callbacks. Connect to
 * the database.
 * c - connection
 */
var DB = new bindings.Informix(settings);
DB.on('error', function(error) {
    console.log("Error: ");
    console.log(error);
}).on('ready', function(server) {
    console.log("Connection ready to ");
    console.log(server);
}).connect(function(err) {
    if (err) {
        throw new Error('Could not connect to DB');
    }
    console.log('Connected to db with ');
    console.log(settings);
    console.log("isConnected() == " + DB.isConnected());
});

if (DB === undefined) {
    DB = new Object();
}

DB.tables = function(res, user) {
    if (!user) {
        return;
    }

    var rs = DB
        .query(
              ""
            , [ user ]
            , function () {
                var rs = arguments[1];
                var cols = arguments[2];

                res.write('<table border="1">');

                if (cols && (rs instanceof Array) && cols.length) {
                    res.write('<th><tr>');
                    for (var i = 0; i < cols.length; ++i) {
                        var c = cols[i];
                        if (c) {
                            res.write('<td>' + c['name'] + '</td>');
                        }
                    }
                    res.write('</tr></th>');
                }

                if (rs && (rs instanceof Array) && rs.length) {
                    for (var i = 0; i < rs.length; ++i) {
                        var r = rs[i];
                        if (r) {
                            res.write('<tr>');
                            for (var col in r) {
                                res.write('<td>' + r[col] + '</td>');
                            }
                            res.write('</tr>');
                        }
                    }
                }

                res.write('</table>');

                // console.log('CALLBACK:');
                // console.log(arguments);

            }
            , {
                start: function(q) {
                    console.log(q);
                }
                , finish: function(f) {
                    console.log('Finish:');
                    console.log(f);
                }
                , async: false
                , cast: true
            }
        )
        .select("*")
        .from("systables", false)
        .where("owner=?")
        .orderby("tabid")
        .execute();
}

DB.databases = function (res) {
    var rs = DB
        .query(
              ""
            , []
            , function () {
                var rs = arguments[1];
                var cols = arguments[2];

                res.write('<table border="1">');

                if (cols && (rs instanceof Array) && cols.length) {
                    res.write('<th><tr>');
                    for (var i = 0; i < cols.length; ++i) {
                        var c = cols[i];
                        if (c) {
                            res.write('<td>' + c['name'] + '</td>');
                        }
                    }
                    res.write('</tr></th>');
                }

                if (rs && (rs instanceof Array) && rs.length) {
                    for (var i = 0; i < rs.length; ++i) {
                        var r = rs[i];
                        if (r) {
                            res.write('<tr>');
                            for (var col in r) {
                                res.write('<td>' + r[col] + '</td>');
                            }
                            res.write('</tr>');
                        }
                    }
                }

                res.write('</table>');

                // console.log('CALLBACK:');
                console.log(arguments);

            }
            , {
                start: function(q) {
                    console.log(q);
                }
                , finish: function(f) {
                    console.log('Finish:');
                    console.log(f);
                }
                , async: false
                , cast: true
            }
        )
        .select("*")
        .from("sysdatabases", false)
        .orderby("name")
        .execute();
}

exports.tables = DB.tables;
exports.databases = exports.db = DB.databases;
