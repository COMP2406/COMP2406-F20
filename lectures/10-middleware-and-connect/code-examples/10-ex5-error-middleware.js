let connect = require('connect');
let http = require('http');
let fs = require('fs');

// Create a connect dispatcher
let app = connect();

//The 'state' the server stores
//Note that this could be an array, files, database, etc.
account = {name: "dave", balance: 0};

function logger(req, res, next){
	console.log("Received request: ");
	console.log("Method: " + req.method);
	console.log("URL: " + req.url);
	next();
}

function errorLogger(err, req, res, next){
	console.log("ERROR: " + err);
	res.writeHead(500);
	res.end('Unable to process the request');
	//Could also call next() instead
	//This would be useful if the handler resolves the error somehow
	//Could also call next("something") to pass error on to next error handler
}

function serveLogin(req, res, next){
	res.writeHead(200, { 'content-type': 'text/html' });
	fs.createReadStream("./login.html").pipe(res);
}

function serveLogo(req, res, next){
	res.writeHead(200, { 'content-type': 'image/jpeg' });
	fs.createReadStream("./banklogo.jpg").pipe(res);
}

function serveScript(req, res, next){
	res.writeHead(200, { 'content-type': 'application/javascript' });
	fs.createReadStream("./script.js").pipe(res);
}

function loginAccount(req, res, next){
	//At this point, we should have 
	// req.body (from parseBody middleware)
	
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
	}catch{
		//If extracting information from body fails (or something else)
		next('Could not parse username or password.');
	}
}

function checkBal(req, res, next){
	res.writeHead(200, { 'content-type': 'text/plain' });
	res.end("" + account.balance);
}

function payMe(req, res, next){
	//At this point, we should have 
	// req.body (from parseBody middleware)
	//We just don't use the data for this handler
	res.writeHead(200, { 'content-type': 'text/plain' });
	account.balance += 5;
	res.end("" + account.balance);
}

//Could expand this or have multiple middleware
// for handling various data types (e.g., JSON, plain text, form)
function parseBody(req, res, next){
	if(req.method === "POST"){
		console.log("Parsing body");
		let body = ""
		req.on('data', (chunk) => {
			body += chunk;
		})
		req.on('end', () => {
			console.log("Received body: " + body);
			req.body = body;
			next();
		})
	}else{
		next();
	}
}

app.use(logger);
app.use(parseBody);

app.use('/login.html', serveLogin);
app.use('/banklogo.jpg', serveLogo);
app.use('/script.js', serveScript);
app.use('/checkbalance', checkBal);
app.use('/account.html', loginAccount);
app.use('/payme', payMe);
app.use('/', serveLogin);
app.use(errorLogger);


// Create an HTTP server with the connect app
// as the request/response handler
let server = http.createServer(app);

//Start the server
server.listen(3000);
console.log('server running on http://localhost:3000');