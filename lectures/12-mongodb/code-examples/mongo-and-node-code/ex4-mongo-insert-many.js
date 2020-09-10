//An array of products to insert
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

const mc = require("mongodb").MongoClient;

//This gives you a 'client' object that you can use to interact with the database
mc.connect("mongodb://localhost:27017/", function(err, client) {
	if(err) throw err;
	console.log("Connected to database.");
	
	//Select the database by name
	let db = client.db('testdb');  
	
	//issue commands to the database object
	db.collection("test").insertMany(products, function(err,result){
		if(err) throw err;
		
		console.log(result);
	});
	
	//Close the client connection
	client.close();
});