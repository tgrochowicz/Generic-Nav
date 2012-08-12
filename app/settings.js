var express = require("express");

exports.boot = function (app) {

	app.configure(function () {
		app.set("views", __dirname + "/views");
		app.set("view engine", "jade");


        //Import global settings
        var customization = require("./customization.json");
        for(var prop in customization){
            app.set(prop, customization[prop]);
        }

        app.set('view options', { layout: false });
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser());
		app.use(express.session({ secret: 'boxakoala'}));
		app.use(app.router);
		app.use(express.static(__dirname + "/../static/"));
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

        var mongo = require('mongodb'),
        Server = mongo.Server,
        Db = mongo.Db;

        var config = require("./config.json");
        var server = new Server(config.mongoHost, config.mongoPort, {auto_reconnect: true});

        var db = new Db(config.mongoDBName, server);

        db.open(function(err, p_db) {
            if(!err) {
                console.log("connected to mongo");
            }
            else{
                throw "Unable to connect to mongo.";
            }

        });


	});
};
