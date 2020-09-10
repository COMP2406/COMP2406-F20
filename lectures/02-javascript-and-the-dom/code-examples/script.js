let count;
function init(){
	console.log("Loaded");
	count = 0;
	let button = document.getElementById("but");
	button.onclick = buttonClicked;
	let textbook = document.getElementById("textbox");
	textbox.onblur = validate;
}

function validate(){
	console.log("validate");
	let textbook = document.getElementById("textbox");
	if(textbook.value.length < 3){
		alert("You need to enter 3 characters.");
	}	
}

function buttonClicked(){
	count++;
	let div = document.getElementById("maincontent");
	div.innerHTML = "You clicked the button " + count + " times.";
}