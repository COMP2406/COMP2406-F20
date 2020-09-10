const connect = require('connect');
const http = require('http');
const fs = require('fs');

const app = connect();
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');

//The 'state' the server stores
//Note that this could be an array, files, database, etc.
account = {name: "dave", balance: 0};


app.use(logger);
app.use(bodyParser.text({type: ["application/x-www-form-urlencoded"]}));
//Note cache control is default
app.use(serveStatic("bank", {index: "login.html"}));

function logger(req, res, next){
	console.log("Received request: ");
	console.log("Method: " + req.method);
	console.log("URL: " + req.url);
	console.log("Content-Type: " + req.headers['content-type']);
	next();
}

function errorLogger(err, req, res, next){
	console.log("ERROR: " + err);
	res.writeHead(500);
	res.end('Unable to process the request');
}

function loginAccount(req, res, next){	
	try{
	//This could actually be a good time to use var instead of let
		let user = req.body.split("&")[0].split("=")[1];
		let pass = req.body.split("&")[1].split("=")[1];
				
		if(user === "dave" && pass === "dave"){
			//Credentials are right, so respond with account page
			res.writeHead(200, { 'content-type': 'text/html' });
			fs.createReadStream("./account.html").pipe(res);
		}else{
			res.writeHead(401);
			res.end("Unauthorized.");
		}
	}catch(err){
		next(err);
	}
}

function checkBal(req, res, next){
	//At this point, we should have 
	// req.body (from parseBody middleware)
	res.writeHead(200, { 'content-type': 'text/plain' });
	res.end("" + account.balance);
}

function payMe(req, res, next){
	//At this point, we should have 
	// req.body (from parseBody middleware)
	res.writeHead(200, { 'content-type': 'text/plain' });
	account.balance += 5;
	res.end("" + account.balance);
}

//We could do this better by defining a serveStatic function
//This function could act like the static file server
// that we saw in an earlier lecture
app.use('/checkbalance', checkBal);
app.use('/account.html', loginAccount);
app.use('/payme', payMe);
app.use(errorLogger);


const server = http.createServer(app);
server.listen(3000);
console.log('server running on http://localhost:3000');