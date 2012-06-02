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
	app.get('/poster/:nodeid', function(req, res){
		res.render('poster', {node : req.params.nodeid } );
	});
};
