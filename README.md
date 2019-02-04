***************************************************************************************
REST API calls using Node.js and Mysql database.

***************************************************************************************
Text Editor : Visual Studio Code node.js
Database : MySQL Community addition
To test api : Postman
**************************************************************************************

=>To start an application
    - Make dir $ mkdir (your directory name)
    - Change directory $ cd (your directory name)
    - initalize the project $npm init -yes

=>Install the following frameworks $npm install <framework_name> -save
    1. express.js
    2. body-parser
    3. express-validator
    4. mysql
    5. stringinject

=> Application starts from server.js
=> Login to the my_sql database(see movie_db.sql file)
    create database movie_db
    create tables movie_detail,actor,actor_movie
    
=> Application starts from server.js(application starts on port 3000)
=> Following are the routes to access to RESTful API
    
     Movies

        1. List all movies -GET - http://localhost:3000/movie/
        2. Add a new movie - POST - http://localhost:3000/movie/        
             Body: {"movie_id" : 1,"movie_name" : "Harry Potter","dateRelease" :2010-5-12}
        3. Get a movie by Id -GET - http://localhost:3000/movie/<movie_id>
        4. Update a movie by Id - PUT -  http://localhost:3000/movie/<movie_id>
        5. Delete a movie by ID - Delete -  http://localhost:3000/movie/<movie_id>
        6. Filter movies with to and from release date - POST -  http://localhost:3000/movie/filterdate
             Body: {"fromdate": "2011-03-12" , "todate": "2012-03-12"}

    Actor 

        1. List all actors -GET - http://localhost:3000/actor/
        2. Add a new actor - POST - http://localhost:3000/actor/       
             Body:{"a_Id": 2 , "actor_Name" : "Natalie Portman"}
        3. Get a actor by Id -GET - http://localhost:3000/actor/<actor_id>
        4. Update a actor by Id - PUT -  http://localhost:3000/movie/<actor_id>
        5. Delete a actor by ID - Delete -  http://localhost:3000/movie/<actor_id>

    Mapping with movies and actors

        1. Add a new actor to a movie - POST - http://localhost:3000/actormovie/
            Body:{"movie_name":"Star Wars",actor_name:"Natalie Portman"}
        2. List all actors for a given movie name - POST - http://localhost:3000/actorsbymovie/     
            Body: {"movie_name":"star wars"}
        3. List all movies for a given actor name - POST - http://localhost:3000/moviesbyactors/    
            Body: {"actor_name":"Tom Cruise"}
        4. Filter actors for a movie in the given year - GET - http://localhost:3000/moviefilter/<year>        