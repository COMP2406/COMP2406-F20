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

//Function factory - takes a resource name and content type
//Returns a function that responds with resource contents
function createStaticRoute(resource, contenttype){
	return function(req, res, next){
		//Could add error checking to ensure file exists
		//Could dynamically retrieve content type based on
		// file extension
		res.writeHead(200, { 'content-type': contenttype });
		fs.createReadStream(resource).pipe(res);
	}
}

app.use(logger);
//We could do this better by defining a serveStatic function
//This function could act like the static file server
// that we saw in an earlier lecture
app.use('/login.html', createStaticRoute("./login.html", "text/html"));
app.use('/banklogo.jpg', createStaticRoute("./banklogo.jpg", "image/jpeg"));
app.use('/script.js', createStaticRoute("./script.js", "application/javascript"));
app.use('/', createStaticRoute("./login.html", "text/html"));


// Create an HTTP server with the connect app
// as the request/response handler
let server = http.createServer(app);

//Start the server
server.listen(3000);
console.log('server running on http://localhost:3000');