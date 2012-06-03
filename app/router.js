
exports.setup = function(app){

	//Add moar URLs if neccesary here! LOLOLOL
	require('./controllers/index').bind(app);

	require('./controllers/addNodes').bind(app);

	require('./controllers/forms').bind(app);

	app.get('/graph', require('./controllers/graph').go);

	//LOL OK
	app.get('/generate', require('./controllers/generate').go );

	app.get('/poster/:nodeid', require('./controllers/poster').go);

	app.get('/node/:nodeid', require('./controllers/node').go);

	app.get('/route/:from', require('./controllers/interstitial').go);

	app.get('/route/:from/:to', require('./controllers/route').go);
	app.get('/nearest/:types/:from', require('./controllers/nearest').go);
};
