var mapping = require('../mapping')

exports.go = function(req, res) {
	var node = mapping.graph[req.params.nodeid]
	node.id = req.params.nodeid;
	for(n in mapping.graph){
		mapping.graph[n].id = n;
	}
	var params = {'node': node , 'floor': mapping.floors[node.pos[2]], 'nodes' : mapping.graph }
	res.render('node', params);
}