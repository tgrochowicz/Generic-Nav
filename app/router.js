exports.setup = function(app){

	//Add moar URLs if neccesary here! LOLOLOL
	app.get('/', function(req, res){
		res.render('index');
	});

	app.get('/addnodes', require('./controllers/addNodes').go);

	app.get('/graph', require('./controllers/graph').go)

	//LOL OK
	app.get('/generate', require('./controllers/generate').go );

	app.get('/poster/:nodeid', require('./controllers/poster').go);

	app.get('/node/:nodeid', require('./controllers/node').go);

	app.get('/route/:from/:to', require('./controllers/route').go);
};
