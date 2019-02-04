/********************************************************************************
Transaction into the database by passing query and database fields as an argument
calling mysql query method.
*********************************************************************************/
var dbCon  = require('./dbConnection');

module.exports ={
    dbTransaction :dbTransaction,
    dbTransactionParam:dbTransactionParam,
    ErrorHandle :ErrorHandle

};

function dbTransaction(strQuery,parameters,result)
{
    console.log(strQuery);
    dbCon.query(strQuery, parameters, function (err, res) {
        if(err) {
            ErrorHandle(err,result);
           }
         else{   
           result(null, res);
              }
          });
}


function dbTransactionParam(strQuery,result)
{
    dbCon.query(strQuery, function (err, res) {
        if(err) {
            ErrorHandle(err,result);
           }
         else{   
           result(null, res);
              }
          });
}

function ErrorHandle(err,result){
    console.log("error: ", err);
    result(err, null);

}