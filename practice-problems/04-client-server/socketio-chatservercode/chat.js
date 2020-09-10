


let socket = null; 

function joinChat(){
	let textbox = document.getElementById("name");
	let name = textbox.value;
	if(name.length > 0){
		if(socket == null){
			socket = io();
			socket.on("newuser", addUser);
			socket.on("newmsg", newMessage);
			socket.on("init", initMessages);
			socket.emit("register", name);
		}
	}else{
		alert("You need a name.");
	}
}

function sendMessage(){
	let msg = document.getElementById("message").value;
	if(msg.length > 0){
		socket.emit("newmsg", msg);
	}
}

function addUser(name){
	console.log("User joined: " + name);
	let newLI = document.createElement("li");
	let text = document.createTextNode(name + " joined the chat.");
	newLI.appendChild(text);
	document.getElementById("messages").appendChild(newLI);
}

function initMessages(data){
	let msg = JSON.parse(data).messages;
	msg.forEach(elem => {
		newMessage(elem);
	})
}

function newMessage(message){
	console.log("New message: " + message);
	let newLI = document.createElement("li");
	let text = document.createTextNode(message);
	newLI.appendChild(text);
	document.getElementById("messages").appendChild(newLI);
}