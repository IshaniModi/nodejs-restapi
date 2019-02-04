/********************************************************************************
Actor model - CRUD operation of actor table doing database transactions
listAll : listing all actors in the database
insertNewActor : insert new actor
getActor : get actor by id.
updateActor : update an actor
deleteActor : delete an actor
*********************************************************************************/


var dbCon  = require('./dbConnection');
var dbut = require('./dbUtils')
var stringInject = require('stringinject')

module.exports = {
    createNewActor : createActor,
    getActorById :  getActorByID,
    updateActorById : updateActorById,
    deleteActorById : deleteActorById,
    listAllActors : listAllActors
}

function createActor(actor, result) {  
    let sqlQuery = "SELECT * FROM actor WHERE actor_name = ?";
    dbCon.query(sqlQuery, actor.actor_Name, function(error, results){
        if(error){
            dbut.ErrorHandle(error,results);
        }
    if(results.length){
    result(null, results)
    }else{
        dbut.dbTransaction("Insert into actor SET ?",actor,result);
    }
    });
   
};

function getActorByID(a_Id, result){
    var strQuery = "Select * from actor where a_Id = ?"; 
    dbut.dbTransaction(strQuery,a_Id,result);
};

function updateActorById(a_Id, actor, result){
    strQuery = "UPDATE actor SET ? WHERE a_Id = ?";
    dbut.dbTransaction(strQuery,[actor,a_Id],result);
 };

function deleteActorById(a_Id, result){
    strQuery ="delete from actor where a_Id = ?";
    dbut.dbTransaction(strQuery,a_Id);
};

function listAllActors(result){
    dbut.dbTransactionParam("Select * from actor",result);
}

function dbTransaction(strQuery,parameters,result)
{
    dbCon.query(strQuery, parameters, function (err, res) {
        if(err) {
            ErrorHandle(err,result);
           }
         else{   
           result(null, res);
              }
          });
}