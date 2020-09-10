const mongoose = require('mongoose');

//Users have a first and last name
let userSchema = mongoose.Schema({
    firstName: String,
    lastName: String
});

//Compile the previously defined schema into a model
//The model is what we will use to work with user documents
//First parameter is a string representing collection name 
// that will be used for this model
//Second parameter is the schema
let UserModel = mongoose.model('User', userSchema);


