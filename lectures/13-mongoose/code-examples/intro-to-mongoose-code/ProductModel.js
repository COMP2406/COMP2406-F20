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

module.exports = mongoose.model("Product", productSchema);
