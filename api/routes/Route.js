'use strict';
var movieList = require('../controllers/movieController');
var actorList = require('../controllers/actorController');
var actormovie = require('../controllers/actor-movieController');

module.exports = function(app) {

    //route to make a service call to list all movies and create a new movie
   app.route('/movie')
    .get(movieList.list_all_movies)
    .post(movieList.create);
   
    //route to get movie by id, update a movie and delete a movie
    app.route('/movie/:movie_id')
     .get(movieList.getMovieByID)
     .put(movieList.updateMovieById)
     .delete(movieList.deleteMovieById);

     //route to filter movies with from and todate
    app.route('/movie/filterdate').post(movieList.filterbyDate)

     //route to add an actor and list all actors
     app.route('/actor')
     .get(actorList.listallactors)
     .post(actorList.create);
    
     //route to get actor by id, update and delete an actor
     app.route('/actor/:a_Id')
      .get(actorList.getactorByID)
      .put(actorList.updateActorById)
      .delete(actorList.deleteActorById);
      
    //route to map an actor with a movie(many to many relationship)
      app.route('/actormovie').post(actormovie.create);
    //route to get list of actors from a given movie name
      app.route('/actorsbymovie').post(actormovie.listActorsByMovies)
    //route to get movie list of the given actor name
      app.route('/moviesbyactors').post(actormovie.listMovieByActor)
     //get actor name of the movies in the particular year
      app.route('/moviefilter/:year').get(actormovie.filterByYear)

};
