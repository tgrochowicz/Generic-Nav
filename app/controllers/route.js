var mapping = require('../mapping')

exports.go = function(req, res) {
	var from = req.params.from;
	from = mapping.graph[from];
	var to = req.params.to;
	to = mapping.graph[to];

	//do something to generate waypoints
	var waypoints = mapping.getRoute(from, to);

	res.render('route', {'waypoints': waypoints});
}