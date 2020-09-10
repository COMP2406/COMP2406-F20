const mc = require("mongodb").MongoClient;

//This gives you a 'client' object that you can use to interact with the database
mc.connect("mongodb://localhost:27017/", function(err, client) {
	if(err) throw err;
	console.log("Connected to database.");
	
	//Select the database by name
	let db = client.db('testdb');  
	
	//Update works just like the Mongo shell
	//updateMany is just the same
	//Query document is {name:"Refined Metal Bike"}
	//Update document is: {$set: {price: 9.99}
	db.collection("test").updateOne({name:"Refined Metal Bike"}, {"$set": {price: 9.99}}, function(err,result){
		if(err) throw err;
		
		console.log(result);
	});
	
	//Close the client connection
	client.close();
});