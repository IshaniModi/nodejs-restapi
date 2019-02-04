/********************************************************************************
Actor and Movie mapping which filters adds actors to a particular movie storing in the database
listAllActorMovie : fetching all actors for a movie name
listMovieByActor : fetching all movies of an actor
insertMovieActor : insert actor for a movie name passing data to store procedure
filterByYear : listing actors that were in a released movie during a specific year 

*********************************************************************************/

const dbut = require("./dbUtils")
var stringInject = require('stringinject')
module.exports = {
    createMovieActor : createMovieActor,
    listActorsByMovie :  listActorsByMovie,
    listMovieByActor : listMovieByActor,
    filterByYear : filterByYear,
  }


function createMovieActor(actormovieobj, result) {  
  var spQuery = stringInject.default("CALL movies_db.actor_movie_insert('{movie_name}','{act_name}');",actormovieobj); 
 dbut.dbTransactionParam(spQuery,result);};

function listActorsByMovie(movie, result){
    var strQuery =stringInject.default("Select actor_name from actor_movie, actor, movie_detail where "+
    "actor.a_Id = actor_movie.a_Id and actor_movie.m_Id = movie_detail.movie_id "+
    "and  movie_detail.movie_name ='{movie_name}'",movie);
    dbut.dbTransactionParam(strQuery,result);
};

function listMovieByActor(actor, result){
    var strQuery =stringInject.default("Select movie_name from actor_movie, actor, movie_detail where "+
    "actor.a_Id = actor_movie.a_Id and actor_movie.m_Id = movie_detail.movie_id "+
    "and  actor.actor_name ='{actor_name}'",actor);
    dbut.dbTransactionParam(strQuery,result);
};
function filterByYear(Year, result){
    var strQuery ="select movie_detail.Year ,actor_name,movie_name from actor_movie, movie_detail , actor "+
                    "where actor_movie.m_Id = movie_detail.movie_id "+
                    "and actor.a_Id = actor_movie.a_Id and year = ?"
    dbut.dbTransaction(strQuery,Year,result);
};

