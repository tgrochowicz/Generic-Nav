var nodes = require("../assets/graph"),
	graph = {},
	floors = [];

function calcDist(a, b) {
	x = a.pos[0] - b.pos[0]
	y = a.pos[1] - b.pos[1]
	return x * x + y * y
}

for (var floor in nodes.floors) {
	floor = parseInt(floor);
	floors[floor] = nodes.floors[floor] //I am floored by this code
}

for (var endpoint in nodes.endpoints) {
	var node = nodes.endpoints[endpoint];
	graph[endpoint] = {
		"name": node.name,
		"pos": node.pos,
		"type": "endpoint",
		"connections": {}
	};
}

for (var junction in nodes.junctions) {
	var node = nodes.junctions[junction];
	graph[junction] = {
		"name": junction,
		"pos": node.pos,
		"type": "junction",
		"connections": {}
	}
	for (var name in node.connections) {
		var endpoint = graph[name],
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

for (var elevator in nodes.elevators) {
	var node = nodes.elevators[elevator];
	graph[elevator] = {
		"name": node.name,
		"pos": node.pos,
		"type": "elevator",
		"connections": {}
	}
	for (var i in node.exits) {
		var exit = node.exits[i],
			junction = graph[exit];
		graph[elevator].connections[exit] = {
			"desc": "Exit the elevator at the " + floors[i],
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
