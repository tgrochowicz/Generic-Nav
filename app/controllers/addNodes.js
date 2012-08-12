var mapping = require('../mapping'),
	fs = require('fs');

require('../data')

function pageHandler(req, res) {
	var params = {
		'floors' : mapping.floors,
		'graph': mapping.graph }
	res.render('addNodes', params);
}

function getNodesHandler(req, res) {
    Data.getAll(function(nodes){
        res.send(JSON.stringify(nodes, null, '   '));
    })
}

function addNodeHandler(req, res) {
	var type = req.body.type,
		name = req.body.name,
		id = req.body.id,
		pos = [parseInt(req.body.posx), parseInt(req.body.posy), parseInt(req.body.floor)],
		locationType = req.body.locationType || null;

	console.log(req.body);

	if(!type || !name || !id) {
		console.log('missing');
		res.send('missing parameters');
		return
	}

	Data.addNode(type, id, name, pos, locationType, function(error) {
		if (error) {
			console.log(error);
			res.send("Not ok!");
		} else {
			console.log('added node');
			res.send("ok");
		}
	});
}

function addConnectionHandler(req, res) {
	var from = req.body.from,
		to = req.body.to,
		fromDesc = req.body.fromDesc,
		toDesc = req.body.toDesc;

	console.log("adding connection")

	if (!from || !to || !fromDesc || !toDesc) {
		console.log("missing parameters")
		res.send("missing parameters");
		return;
	}

	mapping.addConnection(from, to, fromDesc, toDesc, function(error) {
		if (error) {
			console.log(error);
			res.send("Not ok!");
		} else {
			res.send("ok");
		}
	});
}

function deleteNodeHandler(req, res) {
	var id = req.body.id;

	if (!id) {
		res.send('missing id');
		return;
	}
    Data.deleteNode({'id':id}, function(error){
        if (error) {
			console.log(error);
			res.send("Not OK!");
		} else {
			res.send('ok');
		}
    })
}

function deleteConnectionHandler(req, res) {
	var from = req.body.from,
		to = req.body.to;

	if (!from || !to) {
		res.send("missing params");
		return;
	}

	mapping.deleteConnection(from, to, function(error) {
		if (error) {
			console.log(error);
			res.send("Not OK!");
		} else {
			res.send('ok');
		}
	});
}

exports.bind = function(app) {
	app.get('/addnodes', pageHandler);
	app.get('/getnodes', getNodesHandler);
	app.post('/addnode', addNodeHandler);
	app.post('/deletenode', deleteNodeHandler);
	app.post('/addconnection', addConnectionHandler);
	app.post('/deleteconnection', deleteConnectionHandler);
}