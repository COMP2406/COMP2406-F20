const mc = require("mongodb").MongoClient;

//This gives you a 'client' object that you can use to interact with the database
mc.connect("mongodb://localhost:27017/", function(err, client) {
	if(err) throw err;
	console.log("Connected to database.");
	
	//Select the database by name
	let db = client.db('testdb');  
	
	//By default, find() returns a cursor
	//We can use the toArray function to get an array containing the results
	//What happens now if we change the price to 2000?
	db.collection("test").find({price : {$gte : 2000}}).toArray(function(err,result){
		if(err) throw err;
		
		console.log(result);
	});
	
	//Close the client connection
	client.close();
});