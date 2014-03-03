/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

var root = require("./root.js");
exports.root = root.play;

var databases = require("./databases.js");
exports.databases = exports.db = databases.play;

var tables = require("./tables.js");
exports.tables = tables.play;
