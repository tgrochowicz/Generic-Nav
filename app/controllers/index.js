var mapping = require('../mapping');

exports.bind = function(app){
	app.get('/', function(req, res) {
		if (req.session.kiosk) {
			res.redirect('/node/' + req.session.kiosk);
		} else {
			res.render('index', {'nodes': mapping.nodes});
		}
	});

	app.get('/nokiosk', function(req, res) {
		delete req.session.kiosk;
		res.redirect('/');
	});

	app.get('/kiosk/:nodeid', function(req, res) {
		req.session.kiosk = req.params.nodeid;
		res.redirect('/node/' + req.session.kiosk);
	});
}