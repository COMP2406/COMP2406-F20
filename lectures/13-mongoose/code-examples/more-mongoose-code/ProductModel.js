const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSchema = Schema({
	name: {
		type: String, 
		required: true,
		minlength: 3,
		maxlength: 50
	},
	price: {
		type: Number,
		required: [true, "You need a price…"],
		min: [0, "You can't pay people to buy it…"]
	},
	stock: {
		type: Number, 
		required: true,
		min: [0, "You can't have negative stock."],
		max: [100, "We don't have room for that."],
	},
	dimensions: {
		type: {
			x: {type: Number},
			y: {type: Number},
			z: {type: Number}
		},
		default: {
			x: 1,
			y: 1,
			z: 1
		}
	},
	reviews: [Schema.Types.ObjectId],
	buyers: [Schema.Types.ObjectId],
});

productSchema.methods.getVolume = function(){
	return this.dimensions.x * this.dimensions.y * this.dimensions.z;
}

productSchema.methods.sell = function(amount, callback){
	//if(this.stock > amount){
		this.stock -= amount;
		this.save(callback);
		return;
	//}
	//callback("Not enough in stock");
}

productSchema.methods.findSimilarProducts = function(callback){
	//A 'similar' product in this case is something close in price
	//BEtween 80 and 120% of this product's price
	//'this' in this case is a document/instance
	return this.model("Product").find()
	.where("price").gt(this.price*0.8).lt(this.price*1.2)
	.exec(callback);
}

module.exports = mongoose.model("Product", productSchema);
