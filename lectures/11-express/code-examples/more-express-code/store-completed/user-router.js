
//Require the config file and other modules
const config = require("./config.json");
const express = require('express');
const path = require('path');
const fs = require("fs");
//Used for generating random data
const faker = require('faker'); 

//Create the router
let router = express.Router();

//These routes are relative to where the router is mounted
//So this is for requests to /users
//Specify three functions to handle in order
router.get("/", queryParser);
router.get("/", loadUsers);
router.get("/", respondUsers);

//You can also specify multiple functions in a row
//This will use the JSON body parser and then call
// the createUser function
router.post("/", express.json(), createUser);

//Requests for a users's profile
//You can also specify an array of functions
router.get("/:uid", [getUser, sendSingleUser]);
router.put("/:uid", [express.json(), saveUser]);

//Load a user and add a user property to the 
// request object based on user ID request parameter
function getUser(req, res, next){
	//Get the id parameter
	let id = req.params.uid;
	let fileName = path.join(".", config.userDir, id + ".json");
	
	//If the user profile exists, load it, parse object
	// and add the user property to the request before
	// calling next middleware
	if(fs.existsSync(fileName)){
		let data = fs.readFileSync(fileName);
		req.user = JSON.parse(data);
		next();
	}else{
		res.status(404).send("Could not find user.");
	}
}

//Save changes to a user that are given in request body
//More advanced parsing could be done here
//For example, updating only the fields included in body
//We should also person some data validation here too,
// possibly in a previous middleware
function saveUser(req, res, next){
	let id = req.params.uid;
	let fileName = path.join(".", config.userDir, id + ".json");
	
	//Only update the user if there is already a user profile
	// with the specified ID
	if(fs.existsSync(fileName)){
		fs.writeFileSync(fileName, JSON.stringify(req.body));
		res.status(200).send("User saved.");
	}else{
		res.status(404).send("Could not find user.");
	}
}

//Parse the query parameters
//limit: integer specifying maximum number of results to send back
//page: the page of results to send back (start is (page-1)*limit)
//name: string to find in user names to be considered a match
function queryParser(req, res, next){
	const MAX_USERS = 50;
	
	//Query string values are strings by default, so we
	// should try to do type conversion here for safety.
	//Whether you send an error for invalid data or
	// use some default value is a design decision
	
	//If there is not limit parameter, use a default of 10
	if(!req.query.limit){
		req.query.limit = 10;
	}	
	//If the limit is larger than we allow, use the max
	if(req.query.limit > MAX_USERS){ 
		req.query.limit = MAX_USERS;
	}
	
	//Similar to above but with the page parameter
	if(!req.query.page){
		req.query.page = 1;
	}
	if(req.query.page < 1){
		req.query.page = 1;
	}
	
	//Example of type conversion
	//Try to convert page parameter to a number
	try{
		req.query.page = Number(req.query.page);
	}catch{
		//Set a default value if parsing fails
		//Could also set to undefined/ignore
		req.query.page = 1;
	}
	
	//If there is no name parameter, use * as a wildcard 
	// character to signify anything should match
	//Could also just check (!req.query.name) later
	if(!req.query.name){
		req.query.name = "*";
	}
	
	next();
}

//Loads the correct set of users based on the query parameters
//Adds a users property to the response object
//This property is used later to send the response
function loadUsers(req, res, next){
	let results = [];
	let startIndex = (req.query.page-1) * Number(req.query.limit);
	let endIndex = startIndex + Number(req.query.limit);
	let countLoaded = 0;
	let failed = false;
	
	//Read the files in the directory
	//Equivalent to finding all of the users
	//Once we cover databases, this process will be simplified
	fs.readdir(path.join(".", config.userDir), function(err, items) {
		let count = 0;
		//Go through all the files
		for (let fileNum=0; fileNum < items.length; fileNum++) {
			//Read the data from the user's file and parse the object
			let data = fs.readFileSync(path.join(".", config.userDir, items[fileNum]));
			let user = JSON.parse(data);
			
			//If the user matches the query (the name parameter)
			if(req.query.name == "*" || user.name.toLowerCase().includes(req.query.name.toLowerCase())){
				//If this user is the correct index for the page
				// add them to the results
				if(count >= startIndex){
					results.push(user);
				}
				
				//If we have the right number of results
				// the stop reading
				if(results.length >= req.query.limit){
					break;
				}
				
				//Increase the count, require for pagination
				count++;
			}
			
		}
		
		//Set the property on the result object
		//Call the next middleware
		res.users = results;
		next();
	});
}

//Users the res.users property to send a response
//Sends either HTML or JSON, depending on Accepts header
function respondUsers(req, res, next){
	res.format({
		"text/html": () => {res.status(200).send(createHTML(res.users, req))},
		"application/json": () => {res.status(200).json(res.users)}
	});
	next();
}

//Takes an arary of users and the request object (for the query parameters)
//Alternatively, we could have added next/previous pages to the 
// request/response object previously (e.g., with a pagination middleware)
function createHTML(users, req){
	let result = "";
	
	result += "<html><head><title>User Search Results</title></head>";
	result += "<body>";
	
	//Make a link for each user
	users.forEach(user => {
		result += `<a href="${config.host}/${config.userDir}/${user.id}">${user.name}</a><br>`;
	});
	
	//Add next and previous page links
	if(req.query.page > 1){
		result += `<a href="${config.host}/${config.userDir}?page=${req.query.page - 1}&name=${req.query.name}">Previous<a><br>`;
	}
	result += `<a href="${config.host}/${config.userDir}?page=${req.query.page + 1}&name=${req.query.name}">Next<a><br>`;
	
	result += "</body></html>";	
	return result;
}

//Creates a new user with fake details
//In a real system, we could extract the user information
// from the request (e.g., form data or JSON from client-side)
function createUser(req, res, next){
	//Create the user
	let u = {};
	u.id = config.nextUserID;
	u.name = faker.name.firstName() + " " + faker.name.lastName();
	u.address = {address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), zip: faker.address.zipCode()};
	u.reviews = [];
	u.products = [];
	
	//Update the config file and save the user information to file
	config.nextUserID++;
	fs.writeFileSync("config.json", JSON.stringify(config));
	fs.writeFileSync(path.join(".", config.userDir, u.id + ".json"), JSON.stringify(u));
	
	//Respond with the newly created user
	res.status(201).send(u);
}

//Send the representation of a single user that is a property of the request object
//Sends either JSON or HTML, depending on Accepts header
function sendSingleUser(req, res, next){
	res.format({
		"application/json": function(){
			res.status(200).json(req.user);
		},
		"text/html": function(){
			let user = req.user;
			let page = `<html><head><title>${user.name}'s Profile</title></head>`;
			page += "<body>";
			page += `Name: ${user.name}<br>`;
			page += `Address: ${user.address.address}, ${user.address.city}, ${user.address.state}, ${user.address.zip}<br>`;
			page += `ID: ${user.id}<br>`;
			page += "<br>Products Bought:<br>";
			//Link for each product
			user.products.forEach(product => {
				page += `<a href="${product}">${product}<a><br>`;
			});
			//Link for each review
			page += "<br>Reviews:<br>";
			user.reviews.forEach(review => {
				page += `<a href="${review}">${review}<a><br>`;
			});
			page += "</body></html>";
			res.status(200).send(page);
		}		
	});
	
	next();
}

//Export the router object, so it can be mounted in the store-server.js file
module.exports = router;