
//The setTimeout and setInterval functions both take two arguments:
//1. a 'callback' function, which is executed when the timer expires
//2. an amount of time

//Signature is: setTimeout(function/callback, int/time)
//This is a very common pattern in Javascript and Node.js development

console.log( "a" );
//It can help to imagine these timeouts representing reading/writing information from some source
//We will be doing this a lot throughout the course
setTimeout(function() {
    console.log( "c" )
}, 500 );
setTimeout(function() {
    console.log( "d" )
}, 600 );
setTimeout(function() {
    console.log( "e" )
}, 400 );
console.log( "b" );

/*setInterval(function(){
	console.log("EVERYTHING IS OKAY.");
}, 500);*/


/*setTimeout(function(){
	console.log("First timer is up.");
	setTimeout(function(){
		console.log("Second timer is up.");
		setTimeout(function(){
			console.log("Third timer is up.");
		}, 1000);
	}, 1000);
}, 1000);*/