	
const mongoose = require("mongoose");
let Products = require("./ProductModel");

//Find out of stock items
//Should be only Intelligent Metal Mouse
let outOfStock = Products.where("stock").equals(0);

//Find products that have no reviews
//Should be all products
let noReviews = Products.where("reviews").size(0);

//Find products with "ener" in name, that have 500 < price < 1000,
// more than 5 units in stock, and have never been purchased
//Should be just Generic Steel Keyboard
let complexQuery = Products.find()
.where("name").regex(/.*ener.*/)
.where("price").gt(500).lt(1000) //Change to 400 and should get Generic Fresh Chair too
.where("stock").gt(5)
.where("buyers").size(0);


mongoose.connect('mongodb://localhost/store', {useNewUrlParser: true});

//Get the default Mongoose connection (can then be shared across multiple files)
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

//Once connected, create a document for each product
db.once('open', function() {
	outOfStock.exec(function(err, result){
		if(err) throw err;
		console.log("Out of stock products:");
		console.log(result);
	});
	
	noReviews.exec(function(err, result){
		if(err) throw err;
		console.log("Products without reviews:");
		console.log(result);
	});
	
	complexQuery.exec(function(err, result){
		if(err) throw err;
		console.log("Matching products for complex query:");
		console.log(result);
	});
});