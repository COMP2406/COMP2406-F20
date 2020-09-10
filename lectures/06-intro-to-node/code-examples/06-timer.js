

function logC(){
	console.log("C");
}
	
console.log("A");

setTimeout(logC, 3000);

setTimeout(function(){ console.log("D"); }, 2000)

console.log("B");