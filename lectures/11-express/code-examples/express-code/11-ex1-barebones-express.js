
const express = require('express');
let app = express();


app.use("/", function(req, res, next){
	res.end("Hello World");
});

//This is a shorthand way of creating/initializing the HTTP server
//Connect offers this shorthand too
app.listen(3000);
console.log("Server listening at http://localhost:3000");

