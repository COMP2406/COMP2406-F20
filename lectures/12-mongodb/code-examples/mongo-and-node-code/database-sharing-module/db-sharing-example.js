const express = require('express');
const app = express();

//Require the database module
let dbmodule = require("./database");

let otherRouter = require("./other-router");
let db;

//Set up some routes, including one using a router
app.get("/", readFromDB);
app.post("/", writeToDB);
app.use("/other", otherRouter);

//Retrieve the documents from the data collection
//Send them in the response
function readFromDB(req, res, next){
	db.collection("data").find({}).toArray(function(err, result){
		if(err){
			res.status(500).send("Error reading database.");
			return;
		}
		console.log(result);
		res.status(200).send(result);
	});
}

//Write a new random document to the data collection
function writeToDB(req, res, next){
	let newNum = Math.floor(Math.random()*100);
	
	db.collection("data").insertOne({num: newNum}, function(err, result){
		if(err){
			res.status(500).send("Error saving to database.");
			return;
		}
		res.status(200).send("Added new number: " + newNum);
	});
}

//Get the database "data"
//The callback function sets the db variable in this module
// and tells the server to listen
dbmodule.getDB("data", function(err, dbResult){
	if(err){
		console.log("Failed connecting to database.");
	}else{
		db = dbResult;
		app.listen(3000);
		console.log("Server listening on port 3000");
	}
});