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
		required: [true, "You need a price to sell an item."],
		min: [0, "Price must be positive."]
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
	}
});

//Find all purchases made by this buyer
productSchema.methods.findPurchases = function(callback){
	this.model("Purchase").find()
	.where("product").equals(this._id)
	.populate("buyer")
	.exec(callback);
};

module.exports = mongoose.model("Product", productSchema);
