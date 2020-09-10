let connect = require('connect');
let http = require('http');
let fs = require('fs');

// Create a connect dispatcher
let app = connect();
let bodyParser = require('body-parser');

//The 'state' the server stores
//Note that this could be an array, files, database, etc.
account = {name: "dave", balance: 0};

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
	// req.body (from body parser middleware)
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
	res.writeHead(200, { 'content-type': 'text/plain' });
	res.end("" + account.balance);
}

function payMe(req, res, next){
	//At this point, we should have 
	// req.body (from body parser middleware)
	//We don't use the data currently
	res.writeHead(200, { 'content-type': 'text/plain' });
	account.balance += 5;
	res.end("" + account.balance);
}

app.use(logger);
//Don't need anymore: app.use(parseBody);
//Why {type: ["application/x-www-form-urlencoded"]}?
app.use(bodyParser.text({type: ["application/x-www-form-urlencoded"]}));

//We could do this better by defining a serveStatic function
//This function could act like the static file server
// that we saw in an earlier lecture
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