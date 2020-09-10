//Code from Beginning Node.js by Basarat Ali Syed (page 121)

let http = require('http');
let fs = require('fs');
let path = require('path');

//Helper function for sending 404 message
function send404(response) {
	response.writeHead(404, { 'Content-Type': 'text/plain' });
	response.write('Error 404: Resource not found.');
	response.end();
}

//Helper object to get MIME type based on file extension
let mimeLookup = {
	'.js': 'application/javascript',
	'.html': 'text/html',
	'.jpg': 'image/jpeg'
};

let server = http.createServer(function (req, res) {
	if (req.method == 'GET') {
		// resolve file path to filesystem path
		let fileurl;
		if (req.url == '/'){
			fileurl = '/index.html';
		}else{
			fileurl = req.url;
		}
		
		//Find the file's path using the path module
		//Be careful how you do this - you could give access to everything accidentally
		let filepath = path.resolve('./public' + fileurl);
		// lookup mime type of file
		let fileExt = path.extname(filepath);
		let mimeType = mimeLookup[fileExt];
		
		//If unsupported MIME type, send 404 and stop
		if (!mimeType) {
			send404(res);
			return;
		}
		
		// see if we have that file
		fs.exists(filepath, function (exists) {
			// if not, send 404 and stop
			if (!exists) {
				console.log(filepath);
				send404(res);
				return;
			};
		
			// finally stream the file
			res.writeHead(200, { 'content-type': mimeType });
			//pipe method is passing the data read from
			//the file into the response object
			fs.createReadStream(filepath).pipe(res);
			
			/*fs.readFile(filepath, function(err, data){
				if(err){
					res.statusCode = 500;
					res.end("Server failed. Could not read file.");
					return;
				}
				res.writeHead(200, { 'content-type': mimeType });
				res.end(data);
			});*/
		});
	//We could add a block here to handle POST data too
	}else{ //if not a GET request, send 404
		send404(res);
	}
});

server.listen(3000);
console.log('server running on port 3000');