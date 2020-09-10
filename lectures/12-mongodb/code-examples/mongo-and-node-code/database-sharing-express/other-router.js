const express = require('express');
let router = express.Router();

router.get("/", readFromDB);

function readFromDB(req, res, next){
	//Get the db object from req.app.locals and execute a query
	req.app.locals.db.collection("data").find({num: {$gt: 50}}).toArray(function(err, result){
		if(err){
			res.status(500).send("Error reading database.");
			return;
		}
		console.log(result);
		res.status(200).send(result);
	});
}

module.exports = router;
