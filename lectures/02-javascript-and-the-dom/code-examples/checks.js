

function init(){
	let button = document.getElementById("button");
	button.onclick = calculate;
}

function calculate(){
	let count = 0;
	let boxes = document.getElementById("boxes");
	for(let i = 0; i < boxes.childNodes.length; i++){
		if(boxes.childNodes[i].type === "checkbox"){
			if(boxes.childNodes[i].checked){
				count++;
			}
		}
	}
	
	if(count >= 3){
		alert("You are old.");
	}else{
		alert("You are not so old.");
	}
}