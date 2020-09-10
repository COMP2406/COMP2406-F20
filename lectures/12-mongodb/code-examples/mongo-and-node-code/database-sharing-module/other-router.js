const express = require('express');

let router = express.Router();
let dbmodule = require("./database");

router.get("/", readFromDB);

function readFromDB(req, res, next){
	//Get the database "data"
	//Callback in this case takes the database
	// and queries for matching documents (number > 50)
	dbmodule.getDB("data", function(err, db){
		if(err){
			res.status(500).send("Database error.");
			return;
		}else{
			//Query in this case looks for only greater than 50 numbers
			db.collection("data").find({num: {$gt: 50}}).toArray(function(err, result){
				if(err){
					res.status(500).send("Error reading database.");
					return;
				}
				console.log(result);
				res.status(200).send(result);
			});
		}
	});
}


module.exports = router;
