var mapping = require('../mapping')

function pageHandler(req, res) {
	var params = {
		'floors' : mapping.floors,
		'graph': mapping.graph }
	res.render('addNodes', params);
}

function getNodesHandler(req, res) {
	res.send(JSON.stringify(mapping.nodes, null, 4));
}

function addNodeHandler(req, res) {
	
	res.send("ok")
}

exports.bind = function(app) {
	app.get('/addnodes', pageHandler);
	app.get('/getnodes', getNodesHandler);
	app.post('/addnode', addNodeHandler);
}