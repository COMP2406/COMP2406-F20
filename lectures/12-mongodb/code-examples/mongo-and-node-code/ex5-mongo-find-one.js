const mc = require("mongodb").MongoClient;

//This gives you a 'client' object that you can use to interact with the database
mc.connect("mongodb://localhost:27017/", function(err, client) {
	if(err) throw err;
	console.log("Connected to database.");
	
	//Select the database by name
	let db = client.db('testdb');  
	
	//The result in this case is a single object
	//Note the query operators are the same as in the Mongo console
	//You can also have the query operators as strings (e.g., "$gte")
	//Query document in this case is: {price : {"$gte" : 800}
	//What if we change the price to 2000?
	db.collection("test").findOne({price : {"$gte" : 2000}}, function(err,result){
		if(err) throw err;
		
		if(!result){
			console.log("No items found.");
			return;
		}
		
		console.log(result);
		console.log("Name: " + result.name);
	});
	
	//Close the client connection
	client.close();
});