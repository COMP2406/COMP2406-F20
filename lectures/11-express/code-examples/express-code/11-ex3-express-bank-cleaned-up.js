
const express = require('express');
const app = express();

//Require the banking module
//This has handlers for all bank-related routes
//Could also have specific modules for specific routes
//We will see more of this after we discuss RESTful design
const bank = require("./11-ex3-bank-module.js");

app.use(function(req,res,next){
	console.log(req.method);
	console.log(req.url);
	console.log(req.path);
	console.log(req.get("Content-Type"));
	next();
});

app.use(express.static("bank", {index: "login.html"}));
app.use(express.urlencoded({extended: true}));

//We can POST to /account.html and /payme, GET /checkbalance
//All other method/resources will not be processed
app.post("/account.html", bank.loginAccount);
app.get('/checkbalance', bank.checkBal);
app.post('/payme', bank.payMe);

//Note: all functions for handling bank transcations are moved to external module
//Now we only have routes/handlers defined here
//As the complexity of our server grows (many resources, many entities, many routes)
// this will give us much cleaner code


//This is a shorthand way of creating/initializing the HTTP server
//Connect offers this shorthand too
app.listen(3000);
console.log("Server listening at http://localhost:3000");

