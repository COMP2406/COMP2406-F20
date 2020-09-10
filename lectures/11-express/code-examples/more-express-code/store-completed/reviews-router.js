
//Load the configuration
const config = require("./config.json");

//Required modules
const express = require('express');
const path = require('path');
const fs = require("fs");
const faker = require('faker'); //For generating random data

//Create the router
let router = express.Router();

//Requests for /reviews
//Specify three functions to handle in order
router.get("/", queryParser); //Parse the query parameters
router.get("/", loadReviews); //Load matching reviews
router.get("/", respondReviews); //Send the response

//You can also specify multiple functions in a row
router.post("/", express.json(), createReview); //Parse the body, then create a random review

//Requests for a review (/reviews/someID)
router.get("/:id", getReview, sendSingleReview);
router.put("/:id", express.json(), saveReview);

//Parses the query parameters. Possible parameters:
//limit: integer specifying maximum number of results to send back
//page: the page of results to send back (start is (page-1)*limit)
function queryParser(req, res, next){
	const MAX_REVIEWS = 50;
	
	if(!req.query.limit){
		req.query.limit = 10;
	}	
	if(req.query.limit > MAX_REVIEWS){ 
		req.query.limit = MAX_REVIEWS;
	}
	
	if(!req.query.page){
		req.query.page = 1;
	}
	if(req.query.page < 1){
		req.query.page = 1;
	}
	
	try{
		req.query.page = Number(req.query.page);
	}catch{
		req.query.page = 1;
	}
	
	next();
}

//Read a single review's data and saves into 
// review property of request
//Assumes there is an 'id' parameter in the request
function getReview(req, res, next){
	let id = req.params.id;
	let fileName = path.join(".", config.reviewDir, id + ".json");
	//Synchronous file I/O is bad, but we will use DBs later
	if(fs.existsSync(fileName)){
		let data = fs.readFileSync(fileName);
		req.review = JSON.parse(data);
		next();
	}else{
		res.status(404).send("Could not find user.");
	}
}

//Saves a changed review to the file system
//Assumes there is an ID parameter
function saveReview(req, res, next){
	let id = req.params.id;
	let fileName = path.join(".", config.reviewDir, id + ".json");
	if(fs.existsSync(fileName)){
		fs.writeFileSync(fileName, JSON.stringify(req.body));
		res.status(200).send("Review saved.");
	}else{
		res.status(404).send("Could not find review.");
	}
}

//Loads correct reviews and creates a reviews property in response object
//Users specified query parmeters to get the correct amount
function loadReviews(req, res, next){
	let results = [];
	let startIndex = (req.query.page-1) * Number(req.query.limit);
	let endIndex = startIndex + Number(req.query.limit);
	let countLoaded = 0;
	
	fs.readdir(path.join(".", config.reviewDir), function(err, items) {
		let count = 0;
		for (let fileNum=0; fileNum < items.length; fileNum++) {
			let data = fs.readFileSync(path.join(".", config.reviewDir, items[fileNum]));
			let review = JSON.parse(data);
			if(count >= startIndex){
				results.push(review);
			}
			
			if(results.length >= req.query.limit){
				break;
			}
			
			count++;		
		}
		//Update the response object
		res.reviews = results;
		next();
	});
}

//Sends loaded reviews in response
//Sends either JSON or HTML, depending on Accepts header
function respondReviews(req, res, next){
	res.format({
		"text/html": () => {res.status(200).send(createHTML(res.reviews, req))},
		"application/json": () => {res.status(200).json(res.reviews)}
	});
	next();
}

//Creates HTML list of reviews for response
function createHTML(reviews, req){
	let result = "";
	
	result += "<html><head><title>Reviews</title></head>";
	result += "<body>";
	
	//For each review in result, add a link and summary text
	reviews.forEach(review => {
		result += `<a href="${config.host}/${config.reviewDir}/${review.id}">${review.rating} Stars: ${review.summary}</a><br><br>`;
	});
	
	//Build and include next/previous links
	if(req.query.page > 1){
		let nextLink = `${config.host}/${config.reviewDir}?page=${req.query.page - 1}`;

		
		result += `<a href="${nextLink}">Previous<a><br>`;
	}
	
	let params = [`page=${req.query.page + 1}`];
	for(prop in req.query){
		if(prop == "page"){
			continue;
		}
		params.push(prop + "=" + req.query[prop]);
	}
	let queryString = params.join("&");
	
	result += `<a href="${config.host}/${config.reviewDir}?${queryString}">Next<a><br>`;
	
	result += "</body></html>";	
	return result;
}

//Creates a new review in response to POST request to /reviews
//Here, random data is inserted other than reviewer/product
//A real system would likely have most of the data specified
function createReview(req, res, next){
	let r = {};
	r.id = config.nextReviewID;
	r.reviewer = req.body.reviewer;
	r.product = req.body.product;
	r.rating = Math.floor(Math.random()*5) + 1;
	r.summary = faker.lorem.sentence();
	r.review = faker.lorem.paragraph();
			
	config.nextReviewID++;
	fs.writeFileSync("config.json", JSON.stringify(config));
	fs.writeFileSync(path.join(".", config.reviewDir, r.id + ".json"), JSON.stringify(r));
	res.status(201).send(r);
}

//Create response for a single review (/reviews/:id)
//Sends either JSON or HTML
function sendSingleReview(req, res, next){
	res.format({
		"application/json": function(){
			res.status(200).json(req.review);
		},
		"text/html": function(){
			let review = req.review;
			let page = `<html><head><title>Review Summary</title></head>`;
			page += "<body>";
			page += `Reviewer: <a href="${review.reviewer}">${review.reviewer}</a><br>`;
			page += `Product: <a href="${review.product}">${review.product}</a><br>`;
			page += `Rating: ${review.rating}<br>`;
			page += `Summary: ${review.summary}<br>`;
			page += `review: ${review.review}<br>`;
			page += "</body></html>";
			res.status(200).send(page);
		}		
	});
	
	next();
}

//Export the router object so we can access it in the base app
module.exports = router;