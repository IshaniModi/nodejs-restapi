/********************************************************************************
Movie model - CRUD operation of movie table to the database
listAll : listing all movies in the database
insertNewActor : insert new movie
getMovie : get movie by id.
updateMovie : update an actor
deleteMovie : delete an actor
filterbyDate : filter movies using to and from dates
*********************************************************************************/


var dbCon  = require('./dbConnection');
const dbut = require("./dbUtils")
var stringInject = require('stringinject')
module.exports = {
    createNewMovie : createMovie,
    getMovieById :  getMovieByID,
    updateMovieById : updateMovieById,
    deleteMovieById : deleteMovieById,
    listAllMovies : listAllMovies,
    filterbyDate :filterbyDate
 }

function createMovie(movie, result) {  
    let sqlQuery = "SELECT * FROM movie_detail WHERE movie_name = ?";
    dbCon.query(sqlQuery, movie.movie_name, function(error, results){
	if(error){
	    dbut.ErrorHandle(error,results);
	}
 	if(results.length){
      result(null, results)
    }else{

   var dateParts = movie.dateRelease.split("-");
   movie.Year=dateParts[0];
      console.log(movie);
    dbut.dbTransaction("Insert into movie_detail SET ?",movie,result);
	}
});
 
};

function getMovieByID(movie_id, result){
    var strQuery = "Select * from movie_detail where movie_id = ?"; 
    dbut.dbTransaction(strQuery,movie_id,result);
};


function updateMovieById(movie_id, movie, result){
    strQuery = "UPDATE movie_detail SET ? WHERE movie_id = ?";
    dbut.dbTransaction(strQuery,[movie,movie_id],result);
 };

function deleteMovieById(movie_id, result){
    strQuery ="delete from movie_detail where movie_id = ?";
    dbut.dbTransaction(strQuery,movie_id,result);
};

function listAllMovies(result){
     dbut.dbTransactionParam("Select * from movie_detail",result);
}

function filterbyDate(dateObj,result)
{
    var strQuery =stringInject.default("Select movie_name from movie_detail where movie_detail.dateRelease between '{fromdate}' and '{todate}'",dateObj);
    console.log(strQuery);
    dbut.dbTransactionParam(strQuery,result);
}
