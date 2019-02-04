/********************************************************************************
Make mysql db connection passing host, port, user,password and database
*********************************************************************************/
'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    port : "3306",
    user     : 'root',
    password : 'root',
    database : 'movies_db',
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("dbconnection successfull");
});

module.exports =connection;