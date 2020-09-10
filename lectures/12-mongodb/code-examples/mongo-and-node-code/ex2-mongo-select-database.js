const mc = require("mongodb").MongoClient;

//This gives you a 'client' object that you can use to interact with the database
mc.connect("mongodb://localhost:27017/", function(err, client) {
	if(err) throw err;
	console.log("Connected to database.");
	
	//Select the database by name
	let db = client.db('testdb');  
	
	//issue commands to the database object
	
	//Close the client connection
	client.close();
});