let connect = require('connect');
let http = require('http');
let fs = require('fs');

// Create a connect dispatcher
let app = connect();

function logger(req, res, next){
	console.log("Received request: ");
	console.log("Method: " + req.method);
	console.log("URL: " + req.url);
	next();
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

app.use(logger);
//We could do this better by defining a serveStatic function
//This function could act like the static file server
// that we saw in an earlier lecture
app.use('/login.html', serveLogin);
app.use('/banklogo.jpg', serveLogo);
app.use('/script.js', serveScript);
app.use('/', serveLogin);


// Create an HTTP server with the connect app
// as the request/response handler
let server = http.createServer(app);

//Start the server
server.listen(3000);
console.log('server running on http://localhost:3000');