exports.setup = function(app){

	//Add moar URLs if neccesary here! LOLOLOL
	app.get('/', function(req, res){
		res.render('index');
	});
	app.get('/graph', require('./controllers/graph').go)

	//LOL OK
	app.get('/generate', function(req, res){
		res.render('generate');
	});
	app.get('/poster/:nodeid', require('./controllers/poster').go);

	app.get('/node/:nodeid', function(req, res){
		res.render('node', {node: req.params.nodeid });
	});
};
