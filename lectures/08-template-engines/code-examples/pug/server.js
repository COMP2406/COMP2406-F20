
const http = require('http');
const pug = require("pug");

const renderHome = pug.compileFile("./views/pages/index.pug");
const renderAbout = pug.compileFile("./views/pages/about.pug");

let featured = [
	{name: "Rusty Old Bike", price:15.99},
	{name: "Broken Wooden Chair", price:56.99},
	{name: "Rare Dinosaur Egg", price:9.99}
];
let storeMotto = "We break it, you buy it.";

function send404(response){
	response.statusCode = 404;
	response.write("Unknown resource.");
	response.end();
}

function send500(response){
	response.statusCode = 500;
	response.write("Server error.");
	response.end();
}

const server = http.createServer(function (request, response) {
	if(request.method === "GET"){
		if(request.url === "/" || request.url === "/index.html"){
			let content = renderHome({featured: featured, motto: storeMotto});
			response.statusCode = 200;
			response.setHeader("Content-Type", "text/html");
			response.end(content);
		}else if(request.url === "/about"){
			let content = renderAbout({});
			response.statusCode = 200;
			response.setHeader("Content-Type", "text/html");
			response.end(content);
		}
	}else{
		send404(response);
	}
});

//Server listens on port 3000
server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');