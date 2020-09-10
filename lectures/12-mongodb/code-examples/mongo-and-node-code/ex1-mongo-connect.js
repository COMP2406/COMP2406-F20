const mc = require("mongodb").MongoClient;

//This gives you a 'client' object that you can use to interact with the database
mc.connect("mongodb://localhost:27017/", function(err, client) {
	if(err) throw err;
	console.log("Connected to database.");
	
	//in here, you can select a database and start querying
	
	//Close the connection to the database
	client.close();
});