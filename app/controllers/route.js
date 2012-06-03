var mapping = require('../mapping')

exports.go = function(req, res) {
	var from = req.params.from;
	from = mapping.graph[from];
	var to = req.params.to;
	to = mapping.graph[to];

	console.log("from:", from, "\nto:", to)
	console.log("Beginning navigation")

	//do something to generate waypoints
	var waypoints = mapping.getRoute(from, to);

	if (waypoints) {
		res.render('route', {'waypoints': waypoints});
	} else {
		res.render('noroute');
	}
}