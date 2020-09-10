
const express = require('express');
let app = express();

//The 'state' the server stores
//Note that this could be an array, files, database, etc.
account = {name: "dave", balance: 0};

//Logging middleware
app.use(function(req,res,next){
	console.log(req.method);
	console.log(req.url);
	console.log(req.path);
	console.log(req.get("Content-Type"));
	next();
});

//Static server
app.use(express.static("bank", {index: "login.html"}));

//Body parser
app.use(express.urlencoded({extended: true}));

//Other than the static resources handled by static server, 
// we can POST to /account.html and /payme, GET /checkbalance
//All other method/resources will not be processed
app.post("/account.html", loginAccount);
app.get('/checkbalance', checkBal);
app.post('/payme', payMe);


function loginAccount(req, res, next){	
	try{
	//This could actually be a good time to use var instead of let
		let user = req.body.username;
		let pass = req.body.password;
				
		if(user === "dave" && pass === "dave"){
			//Credentials are right, so respond with account page
			//Need to set root directory or specify full path for sendFile
			//__dirname in Node.js refers to directory of current file
			res.status(200).sendFile("bank/account.html", {root: __dirname});
			
			//Equivalent functionality:
			//res.status(200).sendFile(path.join(__dirname, 'bank', 'account.html'));
		}else{
			res.status(401).send("Unauthorized.");
		}
	}catch(err){
		next(err);
	}
}

function checkBal(req, res, next){
	res.set('Content-Type', 'text/plain')
	res.status(200).send("" + account.balance);
}

function payMe(req, res, next){
	account.balance += 5;
	res.set('Content-Type', 'text/plain')
	res.status(200).send("" + account.balance);
}

//This is a shorthand way of creating/initializing the HTTP server
//Connect offers this shorthand too
app.listen(3000);
console.log("Server listening at http://localhost:3000");

