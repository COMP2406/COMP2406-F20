const express = require('express');
const app = express();
const mongoose = require("mongoose");

const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/tokens',
  collection: 'sessions'
});
app.use(session({ secret: 'some secret here', store: store }))

app.set("view engine", "pug");
app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));
let userRouter = require("./user-router");
app.use("/users", userRouter);
let productsRouter = require("./products-router");
app.use("/products", productsRouter);
let reviewsRouter = require("./reviews-router");
app.use("/reviews", reviewsRouter);

app.get('/', function(req, res) {
	//You can perform regular Mongo queries through Mongoose
	// use: mongoose.connection.db to refer to the database connection
	mongoose.connection.db.collection("config").findOne({id:"mainpage"}, function(err, result){
		if(err){
			res.status(500).send("Error reading main page config.");
			return;
		}
		console.log("Result: ")
		console.log(result);
		res.render('pages/index', result);
	});
});

app.post("/login", function(req, res, next){
	if(req.session.loggedin){
		res.redirect("/");
		return;
	}
	
	let username = req.body.username;
	let password = req.body.password;
	mongoose.connection.db.collection("users").findOne({name: username}, function(err, result){
		if(err)throw err;
		
		console.log(result);
		
		if(result){
			//We don't check passwords at all
			//Probably not a great idea in general
			req.session.loggedin = true;
			req.session.username = username;
			req.session.accountType = result.accountType;
			console.log("Username: " + username);
			console.log("Account type: " + result.accountType)
			console.log(result);
			res.redirect("/");
		}else{
			res.status(401).send("Not authorized. Invalid username.");
			return;
		}
	});
});

app.get("/logout", function(req, res, next){
	req.session.loggedin = false;
	res.redirect("/");
})

mongoose.connect('mongodb://localhost/store', {useNewUrlParser: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	let featured = [
		{name: "Rusty Old Bike", price:15.99},
		{name: "Broken Wooden Chair", price:56.99},
		{name: "Rare Dinosaur Egg", price:19.99}
	];
	let storeMotto = "We break it, you buy it.";
	
	mongoose.connection.db.collection("config").replaceOne({id:"mainpage"}, {id:"mainpage", featured: featured, motto: storeMotto}, {upsert:true}, function(err, result){
		if(err){
			console.log("Error adding main page config.");
			return;
		}
		app.listen(3000);
		console.log("Server listening on port 3000");
	});
});