var mapping = require('../mapping')
var url = require('url')

function addNodeFormHandler(req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	console.log(query);
	var params = {
		'x' : query.x,
		'y' : query.y,
		'floor' : query.z,
		'floors' : mapping.floors,
		'graph': mapping.graph,
		'id': query.id || null}
	res.render('addNodeForm', params);
}

function getNodesHandler(req, res) {
	res.send(JSON.stringify(mapping.nodes, null, 4));
}

function addNodeHandler(req, res) {
	
	res.send("ok")
}

exports.bind = function(app) {
	app.get('/addNodeForm', addNodeFormHandler);
}