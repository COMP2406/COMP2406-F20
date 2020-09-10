
const mc = require("mongodb").MongoClient;
const express = require('express')
const session = require('express-session')
const app = express()

// Use the session middleware
app.use(session({ secret: 'some secret here'}))


let db;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/admin", auth, admin);
app.post("/login", login);
app.get("/logout", logout);


 
function auth(req, res, next) {
	if(!req.session.loggedin){
		res.status(401).send("Unauthorized");
		return;
	}
	
	next();
};

function admin(req, res, next){
	res.status(200).send("Welcome to the admin page " + req.session.username);
	return;
}

//If the username and password match somebody in our database,
// then create a new session ID and save it in the database.
//That session ID will be associated with the requesting user
function login(req, res, next){
	if(req.session.loggedin){
		res.status(200).send("Already logged in.");
		return;
	}
	console.log(req.body.username);
	let username = req.body.username;
	let password = req.body.password;
	db.collection("users").findOne({username: username}, function(err, result){
		if(err)throw err;
		
		console.log(result);
		
		if(result){
			if(result.password === password){
				req.session.loggedin = true;
				req.session.username = username;
				res.status(200).send("Logged in");
			}else{
				res.status(401).send("Not authorized. Invalid password.");
			}
		}else{
			res.status(401).send("Not authorized. Invalid username.");
			return;
		}
		
	});
}

function logout(req, res, next){
	if(req.session.loggedin){
		req.session.loggedin = false;
		res.status(200).send("Logged out.");
	}else{
		res.status(200).send("You cannot log out because you aren't logged in.");
	}
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
