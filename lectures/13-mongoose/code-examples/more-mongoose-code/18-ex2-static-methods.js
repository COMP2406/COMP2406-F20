	
const mongoose = require("mongoose");
let Products = require("./ProductModel-v2");

mongoose.connect('mongodb://localhost/store', {useNewUrlParser: true});

//Get the default Mongoose connection (can then be shared across multiple files)
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

//Once connected, create a document for each product
db.once('open', function() {
	Products.findByName("TIC", function(err, results){
		if(err) throw err;
		console.log("Products with TIC in name: " + results);
	});
	
	Products.findByName("sMALL", function(err, results){
		if(err) throw err;
		console.log("Products with small in name: " + results);
	});
	
	Products.findOutOfStock(function(err, results){
		if(err) throw err;
		console.log("Out of stock products: " + results);
	});
});