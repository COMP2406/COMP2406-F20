
const mongoose = require("mongoose");
const Product = require("./ProductModel");
const User = require("./UserModel");
const Purchase = require("./PurchaseModel");

const fs = require("fs");
const path = require("path");
const faker = require('faker');


//Create and save products
let numProducts = 1000;
let productList = [];
for(let i = 0; i < numProducts; i++){
	let p = new Product();
	p.name = faker.commerce.productName();
	p.price = Number(faker.commerce.price());
	p.stock = Number(Math.floor(Math.random() * 50));
	productList.push(p);
}

//create and save users
let numUsers = 250;
let userList = []
for(let i = 0; i < numUsers; i++){
	let u = new User();
	u.name = faker.name.firstName() + " " + faker.name.lastName();
	u.address = {address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), zip: faker.address.zipCode()};
	userList.push(u);
}

let minProducts = 5;
let maxProducts = 20;
let reviewProb = 0.25;
let reviewID = 0
let reviews = {};
let reviewIDList = [];
let totalPurchases = 0;
let purchasesSaved = 0;

userList.forEach(user => {
	let numPurchases = minProducts + Math.floor(Math.random()*maxProducts);
	totalPurchases += numPurchases;
	for(let purchase = 0; purchase < numPurchases; purchase++){
		let product = productList[Math.floor(Math.random()*productList.length)];
		let newPurchase = new Purchase();
		//Both options work below:
		//newPurchase.buyer = user._id;
		newPurchase.buyer = user;
		//newPurchase.product = product._id;
		newPurchase.product = product;
		newPurchase.amount = 1;
		
		if(Math.random() < reviewProb){
			newPurchase.rating = Math.floor(Math.random()*5) + 1;
			newPurchase.summary = faker.lorem.sentence();
			newPurchase.review = faker.lorem.paragraph();
		}

		newPurchase.save(function(err, result){
			if(err) throw err;
			purchasesSaved++;
			if(purchasesSaved % 250 == 0 || purchasesSaved == totalPurchases){
				console.log(purchasesSaved + "/" + totalPurchases + " saved.");
			}
		})
	}
})

mongoose.connect('mongodb://localhost/store', {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	mongoose.connection.db.dropDatabase(function(err, result){
		if(err){
			console.log("Error dropping database:");
			console.log(err);
			return;
		}
		console.log("Dropped database. Starting re-creation.");
		
		let completedProducts = 0;
		productList.forEach(product => {
			product.save(function(err,result){
				if(err) throw err;
				completedProducts++;
				if(completedProducts >= productList.length){
					console.log("All products saved.");
				}
			})
		});
		
		let completedUsers = 0;
		userList.forEach(user => {
			user.save(function(err,result){
				if(err) throw err;
				completedUsers++;
				if(completedUsers >= userList.length){
					console.log("All users saved.");
				}
			})
		});
	});
});