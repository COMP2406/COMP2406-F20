//The 'state' the server stores
//Note that this could be an array, files, database, etc.
account = {name: "dave", balance: 0};

function loginAccount(req, res, next){	
	try{
	//This could actually be a good time to use var instead of let
		let user = req.body.username;
		let pass = req.body.password;

		if(user === "dave" && pass === "dave"){
			//Credentials are right, so respond with account page
			//Need to set root directory or specify full path for sendFile
			//__dirname in Node.js refers to directory of current file
			res.status(200).sendFile("bank/account.html", {root: __dirname});
			
			//Equivalent functionality:
			//res.status(200).sendFile(path.join(__dirname, 'bank', 'account.html'));
		}else{
			res.status(401).send("Unauthorized.");
		}
	}catch(err){
		next(err);
	}
}

function checkBal(req, res, next){
	res.set('Content-Type', 'text/plain')
	res.status(200).send("" + account.balance);
}

function payMe(req, res, next){
	account.balance += 5;
	res.set('Content-Type', 'text/plain')
	res.status(200).send("" + account.balance);
}

module.exports = {payMe, checkBal, loginAccount};