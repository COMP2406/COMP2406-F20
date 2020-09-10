
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

//Once we have a model, we can create new instances/documents
//Note: we could be handling this in a POST request handler
let gary = new UserModel({firstName: "Gary", lastName: "Oldman"});
let jackie = new UserModel({firstName: "Jackie", lastName: "Chan"});

//Start the connection to the database
mongoose.connect('mongodb://localhost/someDatabaseName', {useNewUrlParser: true});

//Get the default Mongoose connection (can then be shared across multiple files)
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	//Find all UserModel documents
	//Alternatively: UserModel.find({}, function(err, results){
	UserModel.find(function(err, results){
	
		console.log("Find all:");
		console.log(results);
	});
	
	//Find UserModel documents with firstName == Harry
	UserModel.find({firstName: "Harry"}, function(err, results){
		console.log("Find people named Harry:");
		console.log(results);
	});	
	
	UserModel.findOne(function(err, result){
		console.log("Find one UserModel document:");
		console.log(result);
		
		//Result in this case is a UserModel document
		//So we can access/change any known properties
		// and save the changes with the save method
		result.lastName = "Young";
		result.save(function(err, result){
			console.log("User saved.");
		});
	});
});