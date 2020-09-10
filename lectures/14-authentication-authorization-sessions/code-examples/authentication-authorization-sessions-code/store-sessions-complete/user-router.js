const mongoose = require("mongoose");
const ObjectId= require('mongoose').Types.ObjectId
const User = require("./UserModel");
const express = require('express');
const faker = require('faker'); 
let router = express.Router();

router.get("/", queryParser);
router.get("/", loadUsers);
router.get("/", respondUsers);

router.post("/", express.json(), createUser);

router.get("/:uid", sendSingleUser);
router.put("/:uid", express.json(), saveUser);

//Load a user based on uid parameter
router.param("uid", function(req, res, next, value){
	let oid;
	console.log("Finding user by ID: " + value);
	try{
		oid = new ObjectId(value);
	}catch(err){
		res.status(404).send("User ID " + value + " does not exist.");
		return;
	}
	
	User.findById(value, function(err, result){
		if(err){
			console.log(err);
			res.status(500).send("Error reading user.");
			return;
		}
		
		if(!result){
			res.status(404).send("User ID " + value + " does not exist.");
			return;
		}
		
		console.log("Result:");
		console.log(result);
		req.user = result;
		result.findPurchases(function(err, result){
			if(err){
				console.log(err);
				//we will assume we can go on from here
				//we loaded the user information successfully
				next();
				return;
			}
			
			req.user.purchases = result;
			next();
		})
		
		if(req.session.loggedin && req.session.username === req.user.name){
			req.user.ownprofile = true;
		}
	});
});

//Save changes to a user that are given in request body
//More advanced parsing could be done here
//For example, updating only the fields included in body
//We should also person some data validation here too,
// possibly in a previous middleware
function saveUser(req, res, next){
	delete req.body._id;
	req.user = Object.assign(req.user, req.body);
	req.user.save(function(err, result){
		if(err){
			console.log(err);
			res.status(500).send("Error updating user.");
			return;
		}
		res.status(200).send(JSON.stringify(result));
	});
}

//Parse the query parameters
//limit: integer specifying maximum number of results to send back
//page: the page of results to send back (start is (page-1)*limit)
//name: string to find in user names to be considered a match
function queryParser(req, res, next){
	const MAX_USERS = 50;
	
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
		if(req.query.limit > MAX_USERS){ 
			req.query.limit = MAX_USERS;
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
	
	if(!req.query.name){
		req.query.name = "?";
	}
	
	next();
}

//Loads the correct set of users based on the query parameters
//Adds a users property to the response object
//This property is used later to send the response
function loadUsers(req, res, next){
	let startIndex = ((req.query.page-1) * req.query.limit);
	let amount = req.query.limit;
	
	User.find()
	.where("name").regex(new RegExp(".*" + req.query.name + ".*", "i"))
	.limit(amount)
	.skip(startIndex)
	.exec(function(err, results){
		if(err){
			res.status(500).send("Error reading users.");
			console.log(err);
			return;
		}
		res.users = results;
		next();
		return;
	});
}

//Users the res.users property to send a response
//Sends either HTML or JSON, depending on Accepts header
function respondUsers(req, res, next){
	res.format({
		"text/html": () => {res.render("pages/users", {users: res.users, qstring: req.qstring, current: req.query.page } )},
		"application/json": () => {res.status(200).json(res.users)}
	});
	next();
}

//Creates a new user with fake details
//In a real system, we could extract the user information
// from the request (e.g., form data or JSON from client-side)
function createUser(req, res, next){
	//Create the user
	let u = new User();
	u.name = faker.name.firstName() + " " + faker.name.lastName();
	u.address = {address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), zip: faker.address.zipCode()};
	
	u.save(function(err, result){
		if(err){
			console.log(err);
			res.status(500).send("Error creating user.");
			return;
		}
		res.status(201).send(JSON.stringify(u));
	})
}

//Send the representation of a single user that is a property of the request object
//Sends either JSON or HTML, depending on Accepts header
function sendSingleUser(req, res, next){
	res.format({
		"application/json": function(){
			res.status(200).json(req.user);
		},
		"text/html": () => { res.render("pages/user", {user: req.user}); }
	});
	
	next();
}

//Export the router object, so it can be mounted in the store-server.js file
module.exports = router;