var mapping = require('../mapping')

exports.go = function(req, res) {
	var from = req.params.from;
	var graph = mapping.graph;
	from = graph[from];
	delete graph[from];
	//separate into location types
	var graph_data = { conference: {}, patientroom: {}, lounge: {}, entrance: {}}
	for(var node in graph){
		if(!graph_data[node.locationType]){
			graph_data[node.locationType] = {};
		}
		graph_data[node.locationType][node.id] = node;
	}
	console.log(graph_data)

	if (from) {
		res.render('interstitial', {'from': from, 'nodes': graph_data });
	} else {
		res.render('nonode');
	}
}