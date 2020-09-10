
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
  //We're connected
  //Save the documents we have created already into the database
	gary.save(function(err){
		if(err) throw err;
		console.log("Saved gary.");
		
		//The variable we created are tied to the document in the database
		//So if we change gary and save, it updates the document in the database
		gary.firstName = "Harry";
		gary.save(function(err){
			if(err) throw err;
		});
	});
	jackie.save(function(err){
		if(err) throw err;
		console.log("Saved jackie.");
	});
	
	//Create a new document and save at same time
	//Second callback input is the created instance
	//You can also get the instance in the save callback
	// but generally don't need to, since you already had it
	UserModel.create({firstName: "Happy", lastName: "Gilmore"}, function(err, newInstance){
		if(err) throw err;
		console.log("Created: " + newInstance);
	});
});