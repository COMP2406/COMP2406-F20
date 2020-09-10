
const fs = require("fs");
const path = require("path");
const faker = require('faker');
const baseURL = "http://localhost:3000";
const productsURL = "/products/";
const reviewsURL = "/reviews/";
const usersURL = "/users/";


//Create and save products
let numProducts = 1000;
let products = {};
let pidList = [];
let productID = 0;
for(let i = 0; i < numProducts; i++){
	let p = {};
	p.id = productID;
	p.name = faker.commerce.productName();
	p.price = faker.commerce.price();
	p.reviews = [];
	p.buyers = [];
	p.url = baseURL + productsURL + p.id;
	products[p.id] = p;
	pidList.push(p.id);
	productID++;
}

//create and save users
let numUsers = 250;
let users = {}
let uidList = [];
let userID = 0;
for(let i = 0; i < numUsers; i++){
	let u = {};
	u.id = userID;
	u.name = faker.name.firstName() + " " + faker.name.lastName();
	u.address = {address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), zip: faker.address.zipCode()};
	u.reviews = [];
	u.products = [];
	u.url = baseURL + usersURL + u.id;
	users[u.id] = u;
	uidList.push(u.id);
	userID++;
}

let minProducts = 5;
let maxProducts = 20;
let reviewProb = 0.25;
let reviewID = 0
let reviews = {};
let reviewIDList = [];
for(uid in uidList){
	let numPurchases = Math.floor(Math.random()*maxProducts) + minProducts;
	for(let purchase = 0; purchase < numPurchases; purchase++){
		let productID = pidList[Math.floor(Math.random()*pidList.length)];
		users[uid].products.push(baseURL + productsURL + productID);
		products[productID].buyers.push(baseURL + usersURL + uid);
		if(Math.random() < reviewProb){
			let review = {}
			review.id = reviewID;
			review.reviewer = baseURL + usersURL + uid;
			review.product = baseURL + productsURL + productID;
			review.rating = Math.floor(Math.random()*5) + 1;
			review.summary = faker.lorem.sentence();
			review.review = faker.lorem.paragraph();
			review.url = baseURL + reviewsURL + review.id;
			reviews[review.id] = review;
			
			products[productID].reviews.push(baseURL + reviewsURL + reviewID);
			users[uid].reviews.push(baseURL + reviewsURL + reviewID);
			
			reviewID++;
		}
	}
}


for(productID in products){
	fs.writeFileSync(path.join(".", "products", productID + ".json"), JSON.stringify(products[productID]), function(err){
		if(err){
			console.log("Error saving products.");
			console.log(err);
		}else{
			//console.log("Users saved.");
		}
	});
}

fs.writeFile(path.join(".", "products.json"), JSON.stringify(products), function(err){
	if(err){
		console.log("Error saving products.");
		console.log(err);
	}else{
		console.log("Products saved.");
	}
});

for(userID in users){
	fs.writeFileSync(path.join(".", "users", userID + ".json"), JSON.stringify(users[userID]), function(err){
		if(err){
			console.log("Error saving users.");
			console.log(err);
		}else{
			//console.log("Users saved.");
		}
	});
}

fs.writeFile(path.join(".", "users.json"), JSON.stringify(users), function(err){
	if(err){
		console.log("Error saving users.");
		console.log(err);
	}else{
		console.log("Users saved.");
	}
});

for(reviewID in reviews){
	fs.writeFileSync(path.join(".", "reviews", reviewID + ".json"), JSON.stringify(reviews[reviewID]), function(err){
		if(err){
			console.log("Error saving reviews.");
			console.log(err);
		}else{
			//console.log("Reviews saved.");
		}
	});
}

fs.writeFile(path.join(".", "reviews.json"), JSON.stringify(reviews), function(err){
	if(err){
		console.log("Error saving reviews.");
		console.log(err);
	}else{
		console.log("Reviews saved.");
	}
});

config = {"userDir":"users","productDir":"products","reviewDir":"reviews","host":"http://localhost:3000"};
config["nextReviewID"] = Number(reviewID) + 1;
config["nextUserID"] = Number(userID) + 1;
config["nextProductID"] = Number(productID) + 1
fs.writeFileSync("./config.json", JSON.stringify(config));
