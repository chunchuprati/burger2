var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var path = require('path');


var app = express();
app.set("port", process.env.PORT || 3000);
var db = require(path.join(__dirname,'/models'));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(methodOverride("_method"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require('./controllers/burgers_controller.js');
app.use('/',routes);
db.sequelize.sync().then(function(){
app.listen(app.get("port"), function(){
    console.log("App is listening the port: " + app.get("port"));
});

});
