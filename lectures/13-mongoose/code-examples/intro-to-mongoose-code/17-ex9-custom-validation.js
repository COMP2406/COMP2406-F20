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
		max: [100, "We don't have room for that."],
		validate:{
			//We don't want more than $100 worth of an item
			validator: function(){ return this.price * this.stock < 100},
			message: "Too much stock on hand."
		}
	},
	//Defining validation on nested objects in Mongoose
	// is awkward. But the approach below does work.
	//type property defines the structure of the nested object
	dimensions: {
		type: {
			x: {type: Number},
			y: {type: Number},
			z: {type: Number}
		},
		default: {
			x: 1,
			y: 1,
			z: 1
		},
		validate: {
			//Input v in this case is the object being validated
			validator: function(v){ console.log(v); return v.x * v.y * v.z < 1000; },
			message: "Volume of products must be less than 1000."
		}
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
  let p = new Product({
	name: "New Product", 
	stock: 10, 
	price: 9, //What if we change this to 10?
	/*dimensions: {
		x: 10,
		y: 10,
		z: 9
	}*/
  });
  
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