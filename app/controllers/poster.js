var http = require('http')
var url = require('url')

exports.go = function(req, res){
		var hostname = req.headers.host; // hostname = 'localhost:8080'
		var protocol = 'http://';
		res.render('poster', {node : req.params.nodeid, host : protocol + hostname } );
}