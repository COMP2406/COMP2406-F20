let products = [ { name: 'Tasty Cotton Chair',
    price: 444.00,
    dimensions: { x: 2, y: 4, z: 5 },
    stock: 21 },
  { name: 'Small Concrete Towels',
    price: 806.00,
    dimensions: { x: 4, y: 7, z: 8 },
    stock: 47 },
  { name: 'Small Metal Tuna',
    price: 897.00,
    dimensions: { x: 7, y: 4, z: 5 },
    stock: 13 },
  { name: 'Generic Fresh Chair',
    price: 403.00,
    dimensions: { x: 3, y: 8, z: 11 },
    stock: 47 },
  { name: 'Generic Steel Keyboard',
    price: 956.00,
    dimensions: { x: 3, y: 8, z: 6 },
    stock: 8 },
  { name: 'Refined Metal Bike',
    price: 435.00,
    dimensions: { x: 7, y: 5, z: 5 },
    stock: 36 },
  { name: 'Practical Steel Pizza',
    price: 98.00,
    dimensions: { x: 4, y: 7, z: 4 },
    stock: 12 },
  { name: 'Awesome Wooden Bike',
    price: 36.00,
    dimensions: { x: 11, y: 10, z: 10 },
    stock: 3 },
  { name: 'Licensed Cotton Keyboard',
    price: 990.00,
    dimensions: { x: 8, y: 7, z: 3 },
    stock: 27 },
  { name: 'Incredible Fresh Hat',
    price: 561.00,
    dimensions: { x: 6, y: 7, z: 5 },
    stock: 28 },
  { name: 'Tasty Cotton Soap',
    price: 573.00,
    dimensions: { x: 2, y: 6, z: 11 },
    stock: 31 },
  { name: 'Intelligent Metal Mouse',
    price: 3.00,
    dimensions: { x: 4, y: 5, z: 10 },
    stock: 0 },
  { name: 'Practical Plastic Ball',
    price: 11.00,
    dimensions: { x: 11, y: 9, z: 11 },
    stock: 25 },
  { name: 'Rustic Fresh Tuna',
    price: 159.00,
    dimensions: { x: 8, y: 6, z: 8 },
    stock: 30 },
  { name: 'Small Metal Tuna',
    price: 225.00,
    dimensions: { x: 8, y: 10, z: 8 },
    stock: 49 } ];
	
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
	},
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
		}
	},
	reviews: [Schema.Types.ObjectId],
	buyers: [Schema.Types.ObjectId],
});

let Product = mongoose.model('Product', productSchema );

mongoose.connect('mongodb://localhost/store', {useNewUrlParser: true});

//Get the default Mongoose connection (can then be shared across multiple files)
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

//Once connected, create a document for each product
db.once('open', function() {
  let countInserted = 0;
  
  //You can create/save each product by itself...
  products.forEach(product => {
	let p = new Product(product);
	
	p.save(function(err, result){
	  if(err){
		  console.log("Error saving product:");
		  console.log(err.message);
		  return;
	  }
	  
	  countInserted++;
	  console.log("Inserted #" + countInserted);
	});  
  });
  
  //Or use the model's insertMany method
  /*Product.insertMany(products, function(err, result){
	  if(err){
		  console.log(err);
		  return;
	  }
	  console.log(result);
  });*/
});