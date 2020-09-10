const http = require('http');
const fs = require('fs');

function send404(response) {
	response.writeHead(404, { 'Content-Type': 'text/plain' });
	response.write('Error 404: Resource not found.');
	response.end();
}

const server = http.createServer(function (request, response) {
	if(request.method == "GET"){
		if(request.url == "/" || request.url == "/chat.html"){
			fs.readFile("./chat.html", (err, data) => {
				if(err){
					//5xx error would be better
					send404(response);
					return;
				}
				response.writeHead(200, { 'content-type' : 'text/html' });
				response.end(data);
			});
		}else if(request.url == "/chat.js"){
			fs.readFile("./chat.js", (err, data) => {
				if(err){
					//5xx error would be better
					send404(response);
					return;
				}
				response.writeHead(200, { 'content-type': 'application/javascript' });
				response.end(data);
			});
		}else{
			send404(response);
		}
	}else{
		send404(response);
	}
});

//Server listens on port 3000
server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');

const io = require("socket.io")(server);

let msgs = []

io.on('connection', socket =>{
	console.log("A connection was made.");

	//add events for that socket
	socket.on('disconnect', () => {
		console.log("Somebody left.");
	})
	
	socket.on("register", name => {
		console.log("User joined: " + name);
		socket.username = name;
		socket.emit('init', JSON.stringify({messages: msgs}));
		io.emit("newuser", name);
	})
	
	socket.on("newmsg", message => {
		message = socket.username + ": " + message
		msgs.push(message);
		io.emit("newmsg", message);
	})
})
