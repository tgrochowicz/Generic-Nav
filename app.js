var express = require("express");

// Setup Express Application
var app = express.createServer();
require("./app/settings").boot(app);
require("./app/router").setup(app);

// Good to go, brah
app.listen(10101, function () {
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});