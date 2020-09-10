
const mc = require("mongodb").MongoClient;
const express = require('express');
const app = express();
const crypto = require('crypto');//used to generate session IDs

let generate_key = function() {
	//Generate 16 random bytes, convert to a base 64 string
    return crypto.randomBytes(16).toString('base64');
};

let db;

app.use(express.static("public"));
app.use(express.json());
app.get("/admin", auth, admin);
app.post("/sessions", login);
app.delete("/sessions", logout);

function auth(req, res, next) {
	if(!req.query.session_id){
		res.status(401).send("Unauthorized");
		return;
	}
	console.log(req.query.session_id);
	
	db.collection("users").findOne({session_id :  req.query.session_id}, function(err, result){
		if(err)throw err;
		
		console.log("Result: " + result);
		if(result){
			//We could load a user object, check more permissions
			// or do any other sort of processing of the user
			// at this point
			req.username = result.username;
			next();
		}else{
			res.status(401).send("Not authorized.");
		}
	}); 
};

function admin(req, res, next){
	res.status(200).send("Welcome to the admin page " + req.username);
	return;
}

//If the username and password match somebody in our database,
// then create a new session ID and save it in the database.
//That session ID will be associated with the requesting user
function login(req, res, next){
	let username = req.body.username;
	let password = req.body.password;
	db.collection("users").findOne({username: username}, function(err, result){
		if(err)throw err;
		
		if(result){
			if(result.password === password){
				let session_id = generate_key();
				let updateDoc = {"$set": {session_id : session_id}};
				db.collection("users").updateOne({username: username}, updateDoc, function(err, result){
					if(err) throw err;
					//encodeURIComponent here because the session_id may have symbols like "="
					res.status(201).send("Logged in. Session ID: " + encodeURIComponent(session_id));
					return;
				})
			}
		}else{
			res.status(401).send("Not authorized.");
			return;
		}
		
	});
}

function logout(req, res, next){
	if(!req.query.session_id){
		res.status(401).send("Not authorized.");
	}
	
	db.collection("users").updateOne({session_id: req.query.session_id}, {"$unset": {"session_id": ""}}, function(err, result){
		if(err) throw err;
		console.log(result);
		if(result.modifiedCount && result.modifiedCount > 0){
			res.status(200).send("Logged out.");
			return;
		}else{
			res.status(401).send("Not authorized.");
			return;
		}
	});
	
}

//Connect to database
mc.connect("mongodb://localhost:27017", function(err, client) {
	if (err) {
		console.log("Error in connecting to database");
		console.log(err);
		return;
	}
	
	//Get the database and save it to a variable
	db = client.db("tokens");
	
	//Only start listening now, when we know the database is available
	app.listen(3000);
	console.log("Server listening on port 3000");
})
