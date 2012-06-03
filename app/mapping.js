var fs = require('fs'),
	nodes = undefined,
	graph = {},
	floors = [];

function calcDist(a, b) {
	if (a.type === "elevator" || b.type === "elevator") {
		return 10;
	}
	x = a.pos[0] - b.pos[0]
	y = a.pos[1] - b.pos[1]
	return Math.sqrt(x * x + y * y)
}

function loadNodes() {
	nodes = require("../static/js/graph")
	exports.nodes = nodes
}

function parseNodes() {
	graph = {};
	for (var floor in nodes.floors) {
		floor = parseInt(floor);
		floors[floor] = nodes.floors[floor] //I am floored by this code
	}

	for (var endpoint in nodes.endpoints) {
		var node = nodes.endpoints[endpoint];
		graph[endpoint] = {
			"id": endpoint,
			"name": node.name,
			"pos": node.pos,
			"type": "endpoint",
			"connections": {}
		};
	}

	for (var junction in nodes.junctions) {
		var node = nodes.junctions[junction];
		graph[junction] = {
			"id": junction,
			"name": junction,
			"pos": node.pos,
			"type": "junction",
			"connections": {}
		}
		for (var name in node.connections) {
			var endpoint = graph[name];

			if (endpoint) {
				dist = calcDist(node, endpoint);
				graph[junction].connections[name] = {
					"desc": node.connections[name][0],
					"dist": dist
				}
				endpoint.connections[junction] = {
					"desc": node.connections[name][1],
					"dist": dist
				}
			}
		}
	}

	for (var elevator in nodes.elevators) {
		var node = nodes.elevators[elevator];
		graph[elevator] = {
			"id": elevator,
			"name": node.name,
			"pos": node.pos,
			"type": "elevator",
			"connections": {}
		}
		for (var i in node.exits) {
			var exit = node.exits[i],
				junction = graph[exit];
			graph[elevator].connections[exit] = {
				"desc": "Exit the elevator at the " + floors[i].description,
				"dist": calcDist(graph[elevator], junction) + 0.5
			}
			junction.connections[elevator] = {
				"desc": "Enter the " + node.name,
				"dist": calcDist(graph[elevator], junction) + 0.5
			}
		}
	}
	exports.graph = graph;
	exports.floors = floors;
}

function dumpNodes(callback) {
	fs.writeFile('static/js/graph.json', JSON.stringify(nodes), callback)
}

function addNode(type, id, name, pos, callback) {
	if (type === 'endpoint' || type === 'junction') {
		nodes[type + 's'][id] = {
			'id': id,
			'name': name,
			'pos': pos,
			'type': type,
			'connections': {}
		}
		parseNodes();
		dumpNodes(callback);
	} else {
		callback("Unrecognized node type");
	}
}

function deleteNode(id, callback) {
	var place;
	console.log(id)
	console.log(nodes.junctions)
	console.log(nodes.endpoints)
	if (graph[id] in nodes.junctions) {
		place = nodes.junctions
	} else if (graph[id] in nodes.endpoints) {
		place = nodes.endpoints
	} else {
		callback("not found")
		return
	}

	delete place[id];
	parseNodes();
	dumpNodes(callback)
}

function addConnection(from, to, fromDesc, toDesc, callback) {
	from = graph[from];
	to = graph[to];
	if (!from || !to) {
		callback("Couldn't find from/to pair")
		return
	}

	if (from.type === 'junction') {
		nodes.junctions[from.id].connections[to.id] = [toDesc, fromDesc];
	}
	if (to.type === 'junction') {
		nodes.junctions[to.id].connections[from.id] = [fromDesc, toDesc];
	}
	parseNodes();
	dumpNodes(callback);
}

function deleteConnection(from, to, callback){
	from = graph[from];
	to = graph[to];
	if (!from || !to) {
		callback("Couldn't find from/to pair")
		return
	}
	if (from.type === 'junction') {
		delete nodes.junctions[from.id].connections[to.id];
	}
	if (to.type === 'junction') {
		delete nodes.junctions[to.id].connections[from.id];
	}
	parseNodes();
	dumpNodes(callback);
}

function addToPath(path, name, connection) {
	var newRoute = path.route.slice(0),
		newTbt = path.tbt.slice(0);
	
	for (var waypoint in path.route) {
		if (path.route[waypoint].id == name) {
			return
		}
	}

	newRoute.push(graph[name]);
	newTbt.push(connection.desc);

	return {
		'dist': path.dist + connection.dist,
		'route': newRoute,
		'tbt': newTbt
	};
}

function extendPath(path) {
	var newPaths = [],
		tip = path.route[path.route.length - 1],
		connection;

	if (tip.type === "endpoint" && path.route.length > 1) {
		// Don't attempt to route through an endpoint.
		return;
	}
	for (var name in tip.connections) {
		connection = tip.connections[name]
		var newPath = addToPath(path, name, connection)
		if (newPath) {
			newPaths.push(addToPath(path, name, connection))
		}
	}
	return newPaths;
}

function addMorePaths(paths, to) {
	var newPaths = [],
		added;
	for (var path in paths) {
		added = extendPath(paths[path]);
		if (added && added.length) {
			for (var plus in added) {
				newPaths.push(added[plus]);
			}
		}
	}
	return newPaths;
}

function generateDirections(path) {
	var directions = [],
		floor = {
			'path': [],
			'tbt': [],
		},
		curr_node = path.route.shift(),
		curr_tbt, past_node;

	floor.floor = floors[curr_node.pos[2]];

	while(curr_node != undefined) {
		if (curr_node.pos[2] != undefined) {
			floor.path.push([curr_node.pos[0], curr_node.pos[1]]);
		}
		floor.tbt.push(curr_tbt);
		past_node = curr_node;
		curr_node = path.route.shift()
		curr_tbt = path.tbt.shift()

		if (curr_node && curr_node.pos[2] != undefined && curr_node.pos[2] != past_node.pos[2]) {
			floor.path = JSON.stringify(floor.path)
			directions.push(floor);
			floor = {
				'path': [],
				'tbt': [],
				'floor': floors[curr_node.pos[2]]
			}
		}
	}
	if (floor.path.length > 0) {
		directions.push(floor);
	}
	
	return directions;	
}

function getRoute (from, to) {
	var paths = [
			{
				'dist': 0,
				'route': [from],
				'tbt': []
			}
		],
		bestPath,
		output;

	while (!bestPath && paths.length) {
		paths = addMorePaths(paths, to);
		for (var p in paths) {
			var path = paths[p]
			if (path.route[path.route.length - 1] == to) {
				if (bestPath) {
					if (path.dist < bestPath.dist) {
						bestPath = path
					}
				} else {
					bestPath = path
				}
			} 
		}
	}
	if (bestPath != undefined) {
		output = generateDirections(bestPath);
	}
	console.log(output);
	return output;
}

loadNodes();
parseNodes();

exports.getRoute = getRoute;
exports.addNode = addNode;
exports.deleteNode = deleteNode;
exports.addConnection = addConnection;
exports.deleteConnection = deleteConnection;
