
let submit = document.getElementById("submit");
submit.onclick = submitProduct;


function submitProduct(){
	let name = document.getElementById("name").value;
	let price = document.getElementById("price").value;
	if(name.length == 0 || price.length == 0){
		alert("You must enter name and price.");
		return;
	}
	
	let product = {name, price};
	console.log(product);
	
	let req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			console.log("All good. " + this.responseText);
			console.log("http://localhost:3000/products/" + this.responseText);
			window.location.href = "http://localhost:3000/products/" + this.responseText;
		}
	}
	
	req.open("POST", "http://localhost:3000/products");
	req.send(JSON.stringify(product));
}