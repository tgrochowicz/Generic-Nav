var mapping = require('../mapping'),
	fs = require('fs');

function pageHandler(req, res) {
	var params = {
		'floors' : mapping.floors,
		'graph': mapping.graph }
	res.render('addNodes', params);
}

function getNodesHandler(req, res) {
	res.send(JSON.stringify(mapping.nodes, null, '   '));
}

function addNodeHandler(req, res) {
	var type = req.body.type,
		name = req.body.name,
		id = req.body.id,
		pos = [parseInt(req.body.posx), parseInt(req.body.posy)];

	if(!type || !name || !id) {
		res.send('missing parameters')
	}

	mapping.addNode(type, id, name, pos, function(error) {
		if (error) {
			console.log(error);
			res.send("Not ok!");
		} else {
			res.send("ok");
		}
	});
}

exports.bind = function(app) {
	app.get('/addnodes', pageHandler);
	app.get('/getnodes', getNodesHandler);
	app.post('/addnode', addNodeHandler);
}