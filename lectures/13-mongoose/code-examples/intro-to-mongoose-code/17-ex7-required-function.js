const mongoose = require("mongoose");
//Save Schema reference into variable to save typing
const Schema = mongoose.Schema;

let productSchema = Schema({
	name: {type: String, required: true},
	//'this' in this case refers to the current document being validated
	price: {type: Number, required: function(){ return this.stock > 0; } },
	stock: {type: Number, required: true},
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
  let p = new Product({name: "Some product", stock: 0});
  p.save(function(err, result){
	  if(err){
		  console.log("Error saving p first time");
		  return;
	  }
	  
	  console.log("Saved p:");
	  console.log(result);
	  
	  //What if we uncomment the below code?
	  /*p.stock = 1;
	  p.save(function(err, result){
		  if(err){
			  console.log("Error saving p the second time");
			  for(x in err.errors){
				  console.log(x);
				  console.log(err.errors[x].kind);
				  console.log(err.errors[x].message);
				  console.log(err.errors[x].path);
				  console.log(err.errors[x].value);
			  }
			  return;
		  }
		  console.log("Saved p again.");
		  console.log(result);
	  })*/
  });
  
  let p2 = new Product({name: "Some other product", stock: 5});
  p2.save(function(err, result){
	  if(err){
		  console.log("Error saving p2");
		  return;
	  }
	  console.log("Saved p2:");
	  console.log(result);
  });
  
  
});