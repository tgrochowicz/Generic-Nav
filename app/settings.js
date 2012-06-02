var express = require("express");

exports.boot = function (app) {

	app.configure(function () {
		app.set("views", __dirname + "/views");
		app.set("view engine", "jade");
		app.set("view options", {"layout": false});
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(app.router);
		app.use(express.static(__dirname + "/../static/"));
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	});
};
