const mongoose = require("mongoose");
//Save Schema reference into variable to save typing
const Schema = mongoose.Schema;

let productSchema = Schema({
	name: String,
	price: Number,
	stock: Number,
	dimensions: {
		x: Number,
		y: Number,
		z: Number,
	},
	reviews: [Schema.Types.ObjectId],
	buyers: [Schema.Types.ObjectId],
});

let Product = mongoose.model('Product', productSchema );

mongoose.connect('mongodb://localhost/someDatabaseName', {useNewUrlParser: true});

//Get the default Mongoose connection (can then be shared across multiple files)
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

//Once connected, create some documents and insert into the database
db.once('open', function() {
  //Create a new product without setting any attributes
  let p = new Product();
  p.save(function(err, result){
	  console.log("Saved:");
	  console.log(result);
  });
});