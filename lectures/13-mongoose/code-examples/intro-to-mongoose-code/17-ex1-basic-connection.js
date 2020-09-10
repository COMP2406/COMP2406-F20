const mongoose = require('mongoose');

//Start the connection to the database
mongoose.connect('mongodb://localhost/someDatabaseName', {useNewUrlParser: true});

//Get the default Mongoose connection (can then be shared across multiple files)
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  //We're connected
  console.log("Connected to someDatabaseName database.");
  
  //We could execute other commands in here
  //We could also just start our server
});