var mapping = require('../mapping')

exports.go = function(req, res) {
	var from = req.params.from;
	var graph = mapping.graph;
	from = graph[from];
	delete graph[from];
	//separate into location types
	var graph_data = { conference: {}, patientroom: {}, lounge: {}, entrance: {}, etc: {}}
	for(var node in graph){
		var loc = node.locationType;
		if(!graph_data[loc]){
			loc = 'etc';
		}
		graph_data[loc][node] = graph[node];
	}
	console.log(graph_data)

	if (from) {
		res.render('interstitial', {'from': from, 'nodes': graph_data });
	} else {
		res.render('nonode');
	}
}