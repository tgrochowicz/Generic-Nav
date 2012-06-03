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
		nodes[type + 's'][name] = {
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

function deleteNode(name, callback) {
	var place;
	if (name in nodes.junctions) {
		place = nodes.junctions
	} else if (name in nodes.endpoints) {
		place = nodes.endpoints
	} else {
		callback("not found")
		return
	}

	delete place[name];
	parseNodes();
	dumpNodes(callback)
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

function getRoute (from, to) {
	var paths = [
			{
				'dist': 0,
				'route': [from],
				'tbt': []
			}
		],
		bestPath;

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
	function generateRoutes(paths){
		var routes = [];
		for(var i = 0; i < paths.length - 1; i++){
			var current = paths[i];
			var future = paths[i+1];
			var x, y, orient;

			if(current.pos[0] < future.pos[0]) x = current.pos[0];
			else x = future.pos[0];

			if(current.pos[1] < future.pos[1]) y = current.pos[1];
			else y = future.pos[1];

			if(current.pos[0] < future.pos[0] && current.pos[1] < future.pos[1]) orient="down";
			else if(current.pos[0] === future.pos[0]) orient="vert";
			else if(current.pos[1] === future.pos[1]) orient="horiz";
			else orient = "up";

			var floor;

			if (current.pos.length == 3){
				floor = current.pos[2];
			}
			else
			{
				floor = future.pos[2];
			}


			var route = {
				x: x,
				y: y,
				orient: orient,
				id: current.name + future.name,
				width: Math.abs(future.pos[0] - current.pos[0]),
				height: Math.abs(future.pos[1] - current.pos[1]),
				floor: floor
			};
			console.log(route);
			routes.push(route);
		}

		return routes;

	};
	function generateFloors(routes)
	{
		var floors = [];
		for(var i = 0; i < routes.length; i++){
				if(!floors[routes[i].floor]){
				var floor = {
					id: routes[i].floor,
					img: '/images/map_level' + (routes[i].floor + 1) + '.jpg'
				}
				floors[floor.id] = floor;
			}
		}
		return floors;
	}
	if (bestPath != undefined) {
		bestPath.routes = generateRoutes(bestPath.route);
		bestPath.floors = generateFloors(bestPath.routes);
	}
	return bestPath;
}

loadNodes();
parseNodes();

exports.getRoute = getRoute;
exports.addNode = addNode;
exports.deleteNode = deleteNode;
