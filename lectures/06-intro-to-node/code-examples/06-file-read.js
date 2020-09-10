
const fs = require("fs");

console.log("Start");

fs.readFile("todo.html", 'utf8', function(err, data){
	if(err){
		console.log("Error.");
		console.log(err);
	}else{
		console.log("Success.");
		console.log(data);
	}
});

console.log("End");