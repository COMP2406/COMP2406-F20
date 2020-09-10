
//Module for working with basic HTTP authentication
const basicAuth = require('basic-auth')

const express = require('express');
const app = express();

//Authentication needed for this page
app.use("/first.html", auth);
//Use static server to serve resources
app.use(express.static("public"));

function auth(req, res, next) {
  //Extract user name/pass from request using basic-auth module
  let user = basicAuth(req);
  
  //If the user information exists 
  // and the user name/pass are correct, go to next middleware
  //Note: this could involve database storage
  if (user && (user.name === "dave" && user.pass === "1234")) {
	  next();
	  return;
  }else{ //Otherwise, send back authenticate header
	//Send back response indicating unauthorized
	// and specifying WWW-Authenticate header
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
	res.status(401).send("Unauthorized");
	return;
  }
 
};


app.listen(3000);
console.log("Server running at http://localhost:3000");