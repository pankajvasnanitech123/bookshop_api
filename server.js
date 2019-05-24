const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4080;
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const bookMgmtRoute = require('./routes/books.routes.js');


// Connecting to database
mongoose.Promise = global.Promise;
mongoose.connect(config.DBHost, { useNewUrlParser: true, useFindAndModify: false }).then(
  () =>
     {
        console.log('Database is connected') 
    },
  err => 
    { 
        console.log('Can not connect to the database'+ err)
    }
);

// Connecting to Node JS Server and using additional CORS and URL Encoding package and other related packages for the project
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Defining the end point for node js routes to be accessible at the front end
app.use('/books', bookMgmtRoute);

// Listening to port for any incoming connections from the client computers(front end)
module.exports = app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});