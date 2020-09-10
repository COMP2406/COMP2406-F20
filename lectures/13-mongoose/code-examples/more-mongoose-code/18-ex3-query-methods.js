	
const mongoose = require("mongoose");
let Products = require("./ProductModel-v3");

mongoose.connect('mongodb://localhost/store', {useNewUrlParser: true});

//Get the default Mongoose connection (can then be shared across multiple files)
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

//Once connected, create a document for each product
db.once('open', function() {
	Products.find()
	.byName("small")
	.where("price").gt(400)
	.limit(5)
	.skip(0)
	.exec(function(err, results){
		if(err) throw err;
		console.log("Products with small in name: " + results);
	});
});