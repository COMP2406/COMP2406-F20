

const mongoose = require("mongoose");
const ObjectId= require('mongoose').Types.ObjectId
const Product = require("./ProductModel");
const express = require('express');
const faker = require('faker');
let router = express.Router();

router.get("/", queryParser);
router.get("/", loadProductsDatabase);
router.get("/", respondProducts);

router.post("/", adminAuth, express.json(), createProduct);

router.get("/:id", sendSingleProduct);
router.put("/:id", express.json(), saveProduct);

//If the id parameter exists, try to load a product
// that matches that ID. Respond with 404 error
// if invalid object ID or ID is not found.
router.param("id", function(req, res, next, value){
	let oid;
	console.log("Finding product by ID: " + value);
	try{
		oid = new ObjectId(value);
	}catch(err){
		res.status(404).send("Product ID " + value + " does not exist.");
		return;
	}
	
	Product.findById(value, function(err, result){
		if(err){
			console.log(err);
			res.status(500).send("Error reading product.");
			return;
		}
		
		if(!result){
			res.status(404).send("Product ID " + value + " does not exist.");
			return;
		}
		
		req.product = result;
		console.log("Result:");
		console.log(result);
		
		
		result.findPurchases(function(err, result){
			if(err){
				console.log(err);
				//we will assume we can go on from here
				//we loaded the product information
				//but couldn't get the people who bought the product
				//so no need to send error status
				next();
				return;
			}
			
			req.product.purchases = result;
			next();
		})
	});
});

//Parse the query parameters
//limit: integer specifying maximum number of results to send back
//page: the page of results to send back (start is (page-1)*limit)
//name: string to find in product name to be considered a match
//minprice: the minimum price to find
//maxprice: the maximum price to find
function queryParser(req, res, next){
	const MAX_PRODUCTS = 50;
	
	//build a query string to use for pagination later
	let params = [];
	for(prop in req.query){
		if(prop == "page"){
			continue;
		}
		params.push(prop + "=" + req.query[prop]);
	}
	req.qstring = params.join("&");
	
	try{
		req.query.limit = req.query.limit || 10;
		req.query.limit = Number(req.query.limit);
		if(req.query.limit > MAX_PRODUCTS){ 
			req.query.limit = MAX_PRODUCTS;
		}
	}catch{
		req.query.limit = 10;
	}
	
	try{
		req.query.page = req.query.page || 1;
		req.query.page = Number(req.query.page);
		if(req.query.page < 1){
			req.query.page = 1;
		}
	}catch{
		req.query.page = 1;
	}
	
	try{
		req.query.minprice = req.query.minprice || 0;
		req.query.minprice = Number(req.query.minprice);
	}catch(err){
		req.query.minprice = 0;
	}
	
	try{
		req.query.maxprice = req.query.maxprice || Number.MAX_SAFE_INTEGER;
		req.query.maxprice = Number(req.query.maxprice);
	}catch{
		req.query.maxprice = Number.MAX_SAFE_INTEGER;
	}
	
	if(!req.query.name){
		req.query.name = "?";
	}
		
	next();
}

//Find mathching products by querying Product model
function loadProductsDatabase(req, res, next){
	let startIndex = ((req.query.page-1) * req.query.limit);
	let amount = req.query.limit;
	
	Product.find()
	.where("price").gte(req.query.minprice).lte(req.query.maxprice)
	.where("name").regex(new RegExp(".*" + req.query.name + ".*", "i"))
	.limit(amount)
	.skip(startIndex)
	.exec(function(err, results){
		if(err){
			res.status(500).send("Error reading products.");
			console.log(err);
			return;
		}
		console.log("Found " + results.length + " matching products.");
		res.products = results;
		next();
		return;
	})
}

//Saves a product using the request body
//Used for updating products with a PUT request
function saveProduct(req, res, next){
	//Remove the ID if there is one in the body
	//The product ID is specified in the URL
	// and is contained in the loaded req.product
	// document. Copy everything else into the
	// req.product document from the body.
	delete req.body._id;
	req.product = Object.assign(req.product, req.body);
	req.product.save(function(err, result){
		if(err){
			console.log(err);
			res.status(500).send("Error updating product.");
			return;
		}
		res.status(200).send(JSON.stringify(result));
	});
}

//Sends an array of products in response to a request
//Uses the products property added by previous middleware
//Sends either JSON or HTML
function respondProducts(req, res, next){
	res.format({
		"text/html": () => {res.render("pages/products", {products: res.products, qstring: req.qstring, current: req.query.page } )},
		"application/json": () => {res.status(200).json(res.products)}
	});
	next();
}

function adminAuth(req, res, next){
	if(req.session.loggedin && req.session.accountType === "admin"){
		next();
	}else{
		res.redirect("/denied.html");
	}
}

//Create a new random product in response to POST /products
//Again, in a real system, we would likely provide a page
// to specify a new products information
function createProduct(req, res, next){
	//Generate a random product
	let p = new Product();
	p.name = faker.commerce.productName();
	p.price = faker.commerce.price();
	p.stock = Math.floor(Math.random()*50);

	p.save(function(err, result){
		if(err){
			console.log(err);
			res.status(500).send("Error creating product.");
			return;
		}
		res.status(201).send(JSON.stringify(p));
	})
}

//Create and send representation of a single product
//Sends either JSON or HTML
function sendSingleProduct(req, res, next){
	res.format({
		"application/json": function(){
			res.status(200).json(req.product);
		},
		"text/html": () => { res.render("pages/product", {product: req.product}); }		
	});
	
	next();
}

//Export the router so it can be mounted in the main app
module.exports = router;