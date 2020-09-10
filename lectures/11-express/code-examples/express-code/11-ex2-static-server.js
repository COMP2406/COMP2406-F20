
const express = require('express');
let app = express();

app.use(function(req,res,next){
	console.log(req.method);
	console.log(req.url);
	console.log(req.path);
	next();
});

//Serve static resources from public, if they exist
app.use(express.static("public"));
//If the resource wasn't in public, serve from other
app.use(express.static("other"));
//If the resource wasn't in other, continue the chain

//This is a shorthand way of creating/initializing the HTTP server
//Connect offers this shorthand too
app.listen(3000);
console.log("Server listening at http://localhost:3000");

