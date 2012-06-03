var mapping = require('../mapping')

exports.go = function(req, res) {
	var from = req.params.from,
		type = req.params.types,
		best, attempt, node;
	from = mapping.graph[from];

	if (!from || !type) {
		console.log("missing parameters");
		res.render('noroute');
		return;
	}

	console.log("from:", from, "\nto type:", type)
	console.log("Beginning navigation")

	for (var id in mapping.graph) {
		console.log('checking', id)
		node = mapping.graph[id];

		if (node.locationType == type) {
			console.log("correct type, navigating")
			attempt = mapping.getRoute(from, node)
			console.log(attempt)
			if (!best || best.dist < attempt.dist) {
				best = attempt
			}
		}
	}

	if (best) {
		res.render('route', {'waypoints': best})
	} else {
		console.log('no valid route');
		res.render('noroute');
	}
}