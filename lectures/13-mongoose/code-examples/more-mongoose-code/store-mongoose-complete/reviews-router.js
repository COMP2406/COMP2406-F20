
const Purchase = require("./PurchaseModel");
const ObjectId= require('mongoose').Types.ObjectId
const express = require('express');
const faker = require('faker');
let router = express.Router();

router.get("/", queryParser); //Parse the query parameters
router.get("/", loadReviews); //Load matching reviews
router.get("/", respondReviews); //Send the response
router.get("/:id", sendSingleReview);

router.param("id", function(req, res, next, value){
	let oid;
	console.log("Finding review by ID: " + value);
	try{
		oid = new ObjectId(value);
	}catch(err){
		console.log(err);
		res.status(404).send("That review does not exist.");
		return;
	}
	
	Purchase.findById(oid).populate("buyer product")
	.exec(function(err, result){
		if(err){
			console.log(err);
			res.status(500).send("Error reading review data.");
			return;
		}
		
		if(!result || !result.rating){
			res.status(404).send("That review does not exist.");
			return;
		}
		console.log("Result:");
		console.log(result);
		res.review = result;
		next();
	});
});

//Parses the query parameters. Possible parameters:
//limit: integer specifying maximum number of results to send back
//page: the page of results to send back (start is (page-1)*limit)
function queryParser(req, res, next){
	const MAX_REVIEWS = 50;
	
	//build a query string to use for pagination later
	let params = [];
	for(prop in req.query){
		if(prop == "page"){
			continue;
		}
		params.push(prop + "=" + req.query[prop]);
	}
	req.qstring = params.join("&");
	
	try{
		req.query.limit = req.query.limit || 10;
		req.query.limit = Number(req.query.limit);
		if(req.query.limit > MAX_REVIEWS){ 
			req.query.limit = MAX_REVIEWS;
		}
	}catch{
		req.query.limit = 10;
	}
	
	try{
		req.query.page = req.query.page || 1;
		req.query.page = Number(req.query.page);
		if(req.query.page < 1){
			req.query.page = 1;
		}
	}catch{
		req.query.page = 1;
	}
	
	next();
}

//Loads correct reviews and creates a reviews property in response object
//Users specified query parmeters to get the correct amount
function loadReviews(req, res, next){
	let startIndex = ((req.query.page-1) * req.query.limit);
	let amount = req.query.limit;
	
	Purchase.find()
	.where("rating").exists()
	.limit(amount)
	.skip(startIndex)
	.exec(function(err, results){
		if(err){
			res.status(500).send("Error reading users.");
			console.log(err);
			return;
		}
		res.reviews = results;
		next();
		return;
	});
}

//Sends loaded reviews in response
//Sends either JSON or HTML, depending on Accepts header
function respondReviews(req, res, next){
	res.format({
		"text/html": () => {res.render("pages/reviews", {reviews: res.reviews, qstring: req.qstring, current: req.query.page } )},
		"application/json": () => {res.status(200).json(res.reviews)}
	});
	next();
}

//Create response for a single review (/reviews/:id)
//Sends either JSON or HTML
function sendSingleReview(req, res, next){
	res.format({
		"application/json": function(){
			res.status(200).json(req.review);
		},
		"text/html": () => {res.render("pages/review", {review: res.review } )}
	});
	
	next();
}

//Export the router object so we can access it in the base app
module.exports = router;