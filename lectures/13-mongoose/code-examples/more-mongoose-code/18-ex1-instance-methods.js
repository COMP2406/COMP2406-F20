	
const mongoose = require("mongoose");
let Products = require("./ProductModel");

mongoose.connect('mongodb://localhost/store', {useNewUrlParser: true});

//Get the default Mongoose connection (can then be shared across multiple files)
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

//Once connected, create a document for each product
db.once('open', function() {
	Products.findOne(function(err, result){
		
		if(err) throw err;
		console.log("Result of findOne: " + result);
		console.log("Product's volume: " + result.getVolume());
		
		
		result.sell(20, function(err, result){
			if(err){
				console.log(err);
				return;
			}
			
			result.findSimilarProducts(function(err, results){
				if(err) throw err;
				console.log("Similar products: " + results);
			});
			
		});
		
	});
});