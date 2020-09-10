

function deleteProduct(){
	req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
			alert("Product deleted successfully.");
			//You can also redirect from client-side Javascript
			//Redirect to products list
			window.location.href = "http://localhost:3000/products";
		}
	}
	let id = document.getElementById("id").value;
	req.open("DELETE", `http://localhost:3000/products/${id}`);
	req.send();
}