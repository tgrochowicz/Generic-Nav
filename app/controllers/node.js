var mapping = require('../mapping')

exports.go = function(req, res) {
	var node = mapping.graph[req.params.nodeid]
	var params = {'node': node , 'floor': mapping.floors[node.pos[2]] }
	res.render('node', params);
}