
const http = require('http');
const fs = require("fs");

//Create a server, giving it the handler function
//Request represents the incoming request object
//Response represents the outgoing response object
//Remember, you can break this apart to make it look cleaner
const server = http.createServer(function (request, response) {
	/*
		GET:
	    / --> go to todo.html
	    /todo.html
		/todo.js
	*/
	console.log("URL: " + request.url);
	if(request.method === "GET"){
		if(request.url === "/todo.html" || request.url === "/"){
			fs.readFile("todo.html", function(err, data){
				if(err){
					response.statusCode = 500;
					response.end("Error reading file.");
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "text/html");
				response.end(data);
			});
		}else if(request.url === "/listdata"){
			//respond with JSON of list object
		}else if(request.url === "/todo.js"){
			fs.readFile("todo.js", function(err, data){
				if(err){
					response.statusCode = 500;
					response.end("Error reading file.");
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "application/javascript");
				response.end(data);
			});
		}else{
			response.statusCode = 404;
			response.end("Unknown resource.");
		}
	}else{
		response.statusCode = 404;
		response.end("Unknown resource.");
	}
});

//Server listens on port 3000
server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');