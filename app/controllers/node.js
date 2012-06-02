var mapping = require('../mapping')

exports.go = function(req, res) {
	var params = {'node': mapping.graph[req.params.nodeid] }
	res.render('node', params);
}