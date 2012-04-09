/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

var root = require("./root.js");
exports.root = root.play;
