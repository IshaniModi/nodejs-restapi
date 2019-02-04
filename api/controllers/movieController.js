/********************************************************************************
Movie controller - CRUD operation of movie table passing to the model
listAll : listing all movies in the database
insertNewActor : insert new movie
getMovie : get movie by id.
updateMovie : update an actor
deleteMovie : delete an actor
filterbyDate : filter movies from to and from dates
*********************************************************************************/


'use strict';
var movie_model = require('../models/movieModel');
var moment = require('moment');
module.exports = {

    list_all_movies : listAll,
    create : insertNewMovie,
    getMovieByID : getMovie,
    updateMovieById : updateMovie,
    deleteMovieById : deleteMovie,
    filterbyDate : filterbyDate
}

function listAll(req,res){
    movie_model.listAllMovies(function(err, movie) {
      if (err)
          res.send(err);
          console.log('res', movie);
        res.send(movie);
      });
}

function insertNewMovie(req, res){
    var movieObj = req.body;
    var dateRelease = movieObj.dateRelease;
if(!dateValidation(dateRelease))
        res.status(400).send({ error:true, message: 'Please insert valid date in YYYY-MM-DD format' });
    else{       
        movie_model.createNewMovie(movieObj, function(err, movie) {
            if (err)
              res.send(err);
            res.json(movie);
          });
        }
    };


  function getMovie(req, res) {
  movie_model.getMovieById(req.params.movie_id, function(err, movie) {
    if (err)
      res.send(err);
    res.json(movie);
  });
};


 function updateMovie(req, res) {
  movie_model.updateMovieById(req.params.movie_id, req.body, function(err, movie) {
    if (err)
      res.send(err);
    res.json(movie);
  });
};


function deleteMovie(req, res) {
  movie_model.deleteMovieById( req.params.movie_id, function(err, movie) {
    if (err)
      res.send(err);
    res.json({ message: 'movie deleted successfully' , result : movie});
  });
};

function filterbyDate(req,res){
  var dateObj = req.body;
  var fromDate = dateObj.fromdate;
  var toDate = dateObj.todate;
   if(!dateValidation(fromDate) || !dateValidation(toDate))
        res.status(400).send({ error:true, message: 'Please insert valid date in YYYY-MM-DD format' });
  else{movie_model.filterbyDate(dateObj, function(err, movie) {
      if (err)
        res.send(err);
      res.json({ result : movie});
    });
  }
}

function dateValidation(date)
{
  if(!moment(date, "YYYY-DD-MM").isValid())
    return false;
  else
    return true;
}

