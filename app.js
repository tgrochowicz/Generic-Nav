var express = require("express");

// Setup Express Application
var app = express();
require("./app/settings").boot(app);
require("./app/router").setup(app);
app.listen(10101);