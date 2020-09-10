

	
const mongoose = require("mongoose");
let Products = require("./ProductModel");


mongoose.connect('mongodb://localhost/store', {useNewUrlParser: true});

//Get the default Mongoose connection (can then be shared across multiple files)
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

//Once connected, create a document for each product
db.once('open', function() {
	Products
	.deleteOne()
	.where("name").equals("Tasty Cotton Chair")
	.exec(function(err, results){
		if(err)throw err;
		console.log(results);
	});
	
	/*Products.findByIdAndDelete("5dcac903838e565670bd43a7", function(err, result){
		if(err)throw err;
		console.log(result);
	})*/
});