const express = require('express');
const app = express();
const mc = require("mongodb").MongoClient;

//Require the other router
let otherRouter = require("./other-router");

//Set up some routes, one of which uses another router
app.get("/", readFromDB);
app.post("/", writeToDB);
app.use("/other", otherRouter);

//Note the change from just db to app.locals.db
function readFromDB(req, res, next){
	app.locals.db.collection("data").find({}).toArray(function(err, result){
		if(err){
			res.status(500).send("Error reading database.");
			return;
		}
		console.log(result);
		res.status(200).send(result);
	});
}

//Note the change from just db to app.locals.db
function writeToDB(req, res, next){
	let newNum = Math.floor(Math.random()*100);
	app.locals.db.collection("data").insertOne({num: newNum}, function(err, result){
		if(err){
			res.status(500).send("Error saving to database.");
			return;
		}
		let newID = result.insertedId;
		res.status(200).send("Added new number: " + newNum);
	});
}

//Connect to the database, get the "data" database
//Save it as an app.locals object
mc.connect("mongodb://localhost:27017", function(err, client) {
	if (err) {
		console.log("Error in connecting to database");
		console.log(err);
		return;
	}
	
	//Set the app.locals.db variale to be the 'data' database
	app.locals.db = client.db("data");
	
	//Start listening
	app.listen(3000);
	console.log("Server listening on port 3000");
})
