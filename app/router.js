exports.setup = function(app){

	//Add moar URLs if neccesary here! LOLOLOL
	app.get('/', function(req, res){
		res.render('index');
	});
};
