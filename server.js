const express = require('express'),   
      app = express(),
      bodyParser = require('body-parser');
   

var port = process.env.PORT || 3000;

//Database connection
var mysql = require("mysql");
app.use(function(req, res, next){
	var connection_string = mysql.createConnection({
        host     : 'localhost',
        PORT : "3306",
		user     : 'root',
		password : 'root',
		database : 'movies_db'
    });
   

    connection_string.connect();
	//res.locals.connect();
	next();
});

app.listen(port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/Route'); //importing route
routes(app); //register the route
console.log('RESTful API server started on: ' + port);
