/********************************************************************************
Actor controller - CRUD operation of actor table passing to the model
listAll : listing all actors in the database
insertNewActor : insert new actor
getActor : get actor by id.
updateActor : update an actor
deleteActor : delete an actor
*********************************************************************************/

'use strict';
var Actor_model = require('../models/actorModel');

module.exports = {

    listallactors : listAll,
    create : insertNewActor,
    getactorByID : getActor,
    updateActorById : updateActor,
    deleteActorById : deleteActor
}

function listAll(req,res){
    Actor_model.listAllActors(function(err, Actor) {
      if (err)
          res.send(err);
          console.log('res', Actor);
        res.send(Actor);
      });
}

function insertNewActor(req, res){
    var ActorObj = req.body;
    if(!ActorObj){
        res.status(400).send({ error:true, message: 'Please enter actor details' });
    }
    else{       
        Actor_model.createNewActor(ActorObj, function(err, Actor) {
            if (err)
              res.send(err);
            res.json(Actor);
          });
        }
    };


  function getActor(req, res) {
  Actor_model.getActorById(req.params.a_Id, function(err, Actor) {
    if (err)
      res.send(err);
    res.json(Actor);
  });
};


 function updateActor(req, res) {
  Actor_model.updateActorById(req.params.a_Id, req.body, function(err, Actor) {
    if (err)
      res.send(err);
    res.json(Actor);
  });
};


function deleteActor(req, res) {
  Actor_model.deleteActorById( req.params.a_Id, function(err, actor) {
    if (err)
      res.send(err);
    res.json({ message: 'Actor deleted successfully' , result : res});
  });
};