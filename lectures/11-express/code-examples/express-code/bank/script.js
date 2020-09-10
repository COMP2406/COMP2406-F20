
function init(){
	req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
			let div = document.getElementById("accountinfo");
			div.innerHTML = "Your bank balance is $" + this.responseText;
		}
	}
	req.open("GET", `http://localhost:3000/checkbalance`);
	req.send();
}

function payMe(){
	req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
			let div = document.getElementById("accountinfo");
			div.innerHTML = "Your bank balance is $" + this.responseText;
		}
	}
	req.open("POST", `http://localhost:3000/payme`);
	req.send();
}