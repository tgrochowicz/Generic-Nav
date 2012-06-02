var mapping = require('../mapping')

exports.go = function(req, res) {
	for(n in mapping.graph){
		mapping.graph[n].id = n;
	}
	var params = {'nodes' : mapping.graph }
	res.render('generate', params);
}