document.getElementById("someOtherButton").onclick = otherHandle;

function handle(source){
	console.log(source);
	console.log(source.id);
}

function otherHandle(event){
	console.log(event);
	console.log(event.srcElement);
	console.log(event.srcElement.id);
}