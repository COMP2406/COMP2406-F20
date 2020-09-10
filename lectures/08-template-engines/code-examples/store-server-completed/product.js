
let submit = document.getElementById("save");
submit.onclick = saveProduct;

function saveProduct(){
	let featured = document.getElementById("isfeatured").checked;
	
	let req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			window.location.href = window.location.href;
		}
	}
	
	req.open("POST", window.location.href);
	req.send(JSON.stringify({featured}));
}