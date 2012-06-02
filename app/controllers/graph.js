var mapping = require('../mapping')

exports.go = function(req, res) {
	res.render('graph', {'graph': mapping.graph, "floors": mapping.floors}); // TODO: Use the word 'graph' more
}