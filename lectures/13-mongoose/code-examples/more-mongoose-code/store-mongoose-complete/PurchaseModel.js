const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//A purchase will consist of a buyer, product, and amount
//(amount isn't actually used)
//There may also be review data
//If one review field exists, all review fields must exist
//This model will allow us to query for all products
// bought by a user, all buyers of a product, and
// reviews about products or made by users
let purchaseSchema = Schema({
	buyer: { type: Schema.Types.ObjectId, ref: 'User' },
	product: { type: Schema.Types.ObjectId, ref: 'Product' },
	amount: {type: Number, required: true},
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: checkReview
	},
	summary: {
		type: String,
		required: checkReview
	},
	review: {
		type: String,
		required: checkReview
	}
});

function checkReview(){
	return this.rating || this.summary || this.review;
}

module.exports = mongoose.model("Purchase", purchaseSchema);
