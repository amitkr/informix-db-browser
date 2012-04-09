/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

var fun = require("./fun.js");
exports.fun = fun.play;
