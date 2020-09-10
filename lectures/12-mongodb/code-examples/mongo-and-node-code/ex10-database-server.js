const express = require('express');
const app = express();
const mc = require("mongodb").MongoClient;

//Variable to store reference to database
let db;

//Define route handlers here
app.get("/", (req, res, next)=>{res.send("Hi!")});

//Connect to database
mc.connect("mongodb://localhost:27017", function(err, client) {
	if (err) {
		console.log("Error in connecting to database");
		console.log(err);
		return;
	}
	
	//Get the database and save it to a variable
	db = client.db("test");
	
	//Only start listening now, when we know the database is available
	app.listen(3000);
	console.log("Server listening on port 3000");
})


