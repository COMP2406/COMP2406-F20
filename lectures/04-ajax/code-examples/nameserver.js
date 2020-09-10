

const express = require('express');
const PORT = process.env.PORT || 3000;

var fs = require('fs');
const app = express();

let names = []
fs.readFile('names.txt', 'utf8', function(err, contents) {
		if(err){
			console.log("Couldnt read names file");
			return;
		}
		names = contents.split("\r\n");
		console.log(names);
	});


app.get('/names.html', (request, response) => {
	fs.readFile('names.html', 'utf8', function(err, contents) {
		if(err){
			response.writeHead(500, { "Content-Type": "text/html"})
			response.end();
			return;
		}
		response.writeHead(200, { "Content-Type": "text/html"})
		response.end(contents);
	});
});

app.get('/names', (request, response) => {
	const maxNames = 25;

	if(request.query.chars){
		console.log("getting: " + request.query.chars);
		let result = { names: [] };
		for(let i = 0; result.names.length < maxNames && i < names.length; i++){
			if(names[i].toLowerCase().startsWith(request.query.chars.toLowerCase())){
				result.names.push(names[i]);
			}
		}
		response.writeHead(200, { "Content-Type": "text/html"})
		response.end(JSON.stringify(result));
	}else{
		let result = { names: [] };
		for(let i = 0; i < maxNames && i < names.length; i++){
			result.names.push(names[i]);
		}
		console.log("getting all");
		response.writeHead(200, { "Content-Type": "text/html"})
		response.end(JSON.stringify(result));
	}
});


app.listen(PORT, err => {
  if(err) console.log(err)
  else {
    console.log(`Server listening on port: ${PORT}`)
    console.log(`To Test:`)
    console.log(`http://localhost:3000/index.html`)
  }
})
