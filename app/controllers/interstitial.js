var mapping = require('../mapping')

exports.go = function(req, res) {
	var from = req.params.from;
	var graph = mapping.graph;
	from = graph[from];
	delete graph[from];

	if (from) {
		res.render('interstitial', {'from': from, 'nodes': graph });
	} else {
		res.render('nonode');
	}
}