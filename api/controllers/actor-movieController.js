/********************************************************************************
Actor and Movie mapping controller which adds actors to a particular movie passing to the model
listAllActorMovie : listing all actors for a movie name
listMovieByActor : listing all movies of an actor
insertMovieActor : insert actor for a movie name
filterByYear : list of actors that were in a released movie during a specific year 

*********************************************************************************/
'use strict';
var ActorMovie_model = require('../models/actor-movieModel');

module.exports = {

    listActorsByMovies : listAllActorMovie,
    create : insertMovieActor,
    listMovieByActor:listMovieByActor,
    filterByYear:filterByYear
  
}

function listAllActorMovie(req,res){
    ActorMovie_model.listActorsByMovie( req.body, function(err, Actor) {
      if (err)
           res.send(err);
        
      if( Actor === undefined ||  Actor.length == 0)
           res.send({ message: 'No actors found in the movie ' + req.body.movie_name });
        else   
            res.json(Actor);
          });
        }
   
function listMovieByActor(req,res){
    ActorMovie_model.listMovieByActor( req.body, function(err, movie) {
        if (err)
        res.send(err);
        if( movie === undefined ||  movie.length == 0)
           res.send({ message: 'No movies found for the actor ' + req.body.actor_name });
        else   
            res.json(movie);
            });
        }


function insertMovieActor(req, res){
    var actormovieobj = req.body;
    if(!actormovieobj){
        res.status(400).send({ error:true, message: 'Please enter actor details' });
    }
    else{       
        ActorMovie_model.createMovieActor(actormovieobj, function(err, Actor) {
            if (err)
              res.send(err);
            res.json(Actor);
          });
        }
    };

    function filterByYear(req,res){
        ActorMovie_model.filterByYear( req.params.year, function(err, filterobj) {
          if (err)
            res.send(err);
         if( filterobj === undefined ||  filterobj.length == 0)
            res.send({ message: 'Movies for the year ' +  req.params.year + ' not found..' });
               else   
          res.json({ message: 'The movie for the year ' + req.params.year , result : filterobj});
        });   
      }
      
   

