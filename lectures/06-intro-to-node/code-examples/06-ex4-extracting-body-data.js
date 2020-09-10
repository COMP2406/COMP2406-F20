const http = require('http');

//Create a server, giving it the handler function
//Request represents the incoming request object
//Response represents the outgoing response object
//Remember, you can break this apart to make it look cleaner
const server = http.createServer(function (request, response) {
	console.log('request starting...');
	
	console.log("method: " + request.method);
	console.log("URL: " + request.url);
	console.log("headers: " + JSON.stringify(request.headers));
	
	if(request.method === "POST"){
		//Could check URL as well for specific routes
		let body = ""
		request.on('data', (chunk) => {
			body += chunk;
		})
		request.on('end', () => {
			console.log("body: " + body);
			//Send the body information back, just for fun
			response.write(body);
			response.end();
			dave = JSON.parse(body);
			console.log("Name: " + dave.name);
			console.log("Job: " + dave.job);
		})
	}else{
		// respond
		response.write('hello client!');
		response.end();
	}
});

server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');

