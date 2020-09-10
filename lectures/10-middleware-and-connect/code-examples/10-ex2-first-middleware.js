let connect = require('connect');
let http = require('http');

// Create a connect dispatcher
let app = connect();

//Define the middleware logger function
function logger(req, res, next){
	//Log various request parameters
	console.log("Received request: ");
	console.log("Method: " + req.method);
	console.log("URL: " + req.url);
	next();
}

//Register the logger middleware with the app
app.use(logger);

/*
 Create an HTTP server with the connect app
 as the request/response handler. This works
 because the connect 'app' is really just a 
 function with three arguments (request,
 response, next). So the HTTP server will
 pass the request/response arguments to
 Connect each time a request is made.
*/
let server = http.createServer(app);

//Start the server
server.listen(3000);
console.log('server running on http://localhost:3000');