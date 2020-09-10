const express = require('express');
const app = express();
const mc = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
let db;

//Use body parser for form data
app.use(express.urlencoded({extended: true})); 
app.set("view engine", "pug");

//Serve static files from public (for the add page)
app.use(express.static("public"));

app.get("/products", listProducts);
app.post("/products", createNewProduct);
app.get("/products/:pid", readProduct);

//A useful note: PUT would be the appropriate method here
// but you cannot PUT/DELETE from an HTML form.
//You can, however, PUT/DELETE via XMLHttpRequest
app.post("/products/:pid", updateProduct);

app.delete("/products/:pid", getObjectId, deleteProduct);

function createNewProduct(req, res, next){
	let product = {}
	
	//You should do type checking and validation here
	product.name = req.body.name;
	product.price = Number(req.body.price);
	product.stock = Number(req.body.stock);
	product.dimensions = {};
	product.dimensions.x = Number(req.body.x);
	product.dimensions.y = Number(req.body.y);
	product.dimensions.z = Number(req.body.z);
	
	db.collection("products").insertOne(product, function(err, result){
		if(err){
			res.status(500).send("Error saving to database.");
			return;
		}
		let newID = result.insertedId;
		
		//Redirect to the view page for the new product
		res.redirect("http://localhost:3000/products/" + newID);
	});
}

function getObjectId(req, res, next){
	let id = req.params.pid;	
	let oid;
	console.log("id: " + id);
	try{
		oid = new ObjectID(id);
	}catch{
		res.status(404).send("That ID does not exist.");
		return;
	}
	req.objectid = oid
	next();
}

function deleteProduct(req, res, next){
	db.collection("products").removeOne({"_id": req.objectid}, function(err, result){
		if(err){
			res.status(500).send("Error saving to database.");
			return;
		}
		console.log(result);
		res.status(200).send();
	});
}

function updateProduct(req, res, next){
	let id = req.params.pid;	
	let oid;
	console.log("id: " + id);
	try{
		oid = new ObjectID(id);
	}catch{
		res.status(404).send("That ID does not exist.");
		return;
	}
	
	let product = {}
	
	//You should do type checking and validation here
	product.name = req.body.name;
	product.price = Number(req.body.price);
	product.stock = Number(req.body.stock);
	product.dimensions = {};
	product.dimensions.x = Number(req.body.x);
	product.dimensions.y = Number(req.body.y);
	product.dimensions.z = Number(req.body.z);
	
	db.collection("products").replaceOne({"_id": oid}, product, function(err, result){
		if(err){
			res.status(500).send("Error saving to database.");
			return;
		}
		console.log(result);
		//Redirect to the view page for the new product
		res.redirect("http://localhost:3000/products/" + id);
	});
}

function listProducts(req, res, next){
	db.collection("products").find({}).toArray(function(err, result){
		if(err){
			res.status(500).send("Error reading database.");
			return;
		}
		console.log(result);
		res.status(200).render("productlist", {products: result});
	});
}

function readProduct(req, res, next){
	let id = req.params.pid;	
	let oid;

	try{
		oid = new ObjectID(id);
	}catch{
		res.status(404).send("That ID does not exist.");
		return;
	}
	console.log("id: " + id);
	db.collection("products").findOne({"_id": oid}, function(err, result){
		if(err){
			res.status(500).send("Error reading database.");
			return;
		}
		if(!result){
			res.status(404).send("That ID does not exist in the database.");
			return;
		}
		res.status(200).render("product", {product: result});
	});
}

mc.connect("mongodb://localhost:27017", function(err, client) {
	if (err) {
		console.log("Error in connecting to database");
		console.log(err);
		return;
	}
	
	//Set the app.locals.db variale to be the 'data' database
	db = client.db("mysite");
	app.listen(3000);
	console.log("Server listening on port 3000");
})
