	
const mongoose = require("mongoose");
let Products = require("./ProductModel");

let findAll = Products.find();

mongoose.connect('mongodb://localhost/store', {useNewUrlParser: true});

//Get the default Mongoose connection (can then be shared across multiple files)
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

//Once connected, create a document for each product
db.once('open', function() {
	findAll.exec(function(err, result){
		if(err) throw err;
		
		console.log(result);
	});
});