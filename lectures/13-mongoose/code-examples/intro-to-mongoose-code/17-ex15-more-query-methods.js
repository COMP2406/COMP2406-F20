
	
const mongoose = require("mongoose");
let Products = require("./ProductModel");


mongoose.connect('mongodb://localhost/store', {useNewUrlParser: true});

//Get the default Mongoose connection (can then be shared across multiple files)
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

//Once connected, create a document for each product
db.once('open', function() {
	Products..find()where("price").gt(100).lt(750)
	//.count()
	//.limit(5)
	//.skip(5)
	.exec(function(err, result){
		if(err) throw err;
		console.log(result);
	});
});