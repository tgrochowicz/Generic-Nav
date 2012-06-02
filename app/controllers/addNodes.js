var mapping = require('../mapping')

exports.go = function(req, res) {
	var params = {
		'floors' : mapping.floors,
		'graph': mapping.graph }
	res.render('addNodes', params);
}