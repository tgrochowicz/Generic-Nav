var nodes = require("../assets/graph"),
	graph = {},
	floors = [];

for (var floor in nodes.floors) {
	floor = parseInt(floor);
	floors[floor] = nodes.floors[floor] //I am floored by this code
}

for (var endpoint in nodes.endpoints) {
	var node = nodes.endpoints[endpoint];
	graph[endpoint] = {
		"name": node.name,
		"pos": node.pos,
		"connections": {}
	};
}

for (var junction in nodes.junctions) {
	var node = nodes.junctions[junction];
	graph[junction] = {
		"name": junction,
		"pos": node.pos,
		"connections": {}
	}
	for (var name in node.connections) {
		var endpoint = graph[name];
		graph[junction].connections[name] = node.connections[name][0];
		endpoint.connections[junction] = node.connections[name][1];
	}
}

for (var elevator in nodes.elevators) {
	var node = nodes.elevators[elevator];
	graph[elevator] = {
		"name": node.name,
		"pos": node.pos,
		"connections": {}
	}
	for (var i in node.exits) {
		var exit = node.exits[i],
			junction = graph[exit];
		graph[elevator].connections[exit] = "Exit the elevator at the " + floors[i];
		junction.connections[elevator] = "Enter the " + node.name;
	}
}

exports.graph = graph;
exports.floors = floors;