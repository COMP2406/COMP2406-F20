const mongoose = require("mongoose");
//Save Schema reference into variable to save typing
const Schema = mongoose.Schema;

let productSchema = Schema({
	name: {
		type: String, 
		required: true,
		minlength: 3,
		maxlength: 50
	},
	price: {
		type: Number,
		required: [true, "You need a price…"],
		min: [0, "You can't pay people to buy it…"]
	},
	stock: {
		type: Number, 
		required: true,
		min: [0, "You can't have negative stock."],
		max: [100, "We don't have room for that."]
	},
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
  let p = new Product({ });
  p.save(function(err, result){
	  if(err){
		  console.log("Error saving product:");
		  console.log(err.message);
		  return;
	  }
	  
	  console.log("Saved p:");
	  console.log(result);
  });  
});