var mapping = require('../mapping')
var url = require('url')

function addNodeFormHandler(req, res) {
	var id = req.query['id'] || null,
		node = id ? mapping.graph[id] : null,
		params = {
			'x' : req.query['x'],
			'y' : req.query['y'],
			'floor' : req.query['z'],
			'floors' : mapping.floors,
			'graph': mapping.graph,
			'id': id,
			'name': node ? node.name : '',
			'type': node ? node.type : null,
			'locationType': node ? node.locationType : null,
			'connections': node ? node.connections : []
		};
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