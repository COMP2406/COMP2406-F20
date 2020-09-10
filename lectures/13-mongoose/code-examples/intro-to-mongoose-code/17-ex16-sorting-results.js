

	
const mongoose = require("mongoose");
let Products = require("./ProductModel");


mongoose.connect('mongodb://localhost/store', {useNewUrlParser: true});

//Get the default Mongoose connection (can then be shared across multiple files)
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

//Once connected, create a document for each product
db.once('open', function() {
	Products
	.find()
	.limit(5)
	//.skip(5)
	.sort("price")
	.sort("-stock")
	.exec(function(err, results){
		if(err)throw err;
		console.log(results);
	});
});