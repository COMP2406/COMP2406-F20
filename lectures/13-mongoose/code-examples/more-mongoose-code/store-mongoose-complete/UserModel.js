const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = Schema({
	//Names will be strings between 1-30 characters
	//Must consist of only A-Z characters
	//Will be trimmed automatically (i.e., outer spacing removed)
	name: {
		type: String, 
		required: true,
		minlength: 1,
		maxlength: 30,
		match: /[A-Za-z]+/,
		trim: true
	},
	address: {
		address:{
			type: String,
			required: true
		},
		city: {
			type: String,
			required: true
		},
		state:{
			type: String,
			required: true
		},
		zip: {
			type: String,
			required: true
		}
	}
});

//Instance method finds purchases of this user
userSchema.methods.findPurchases = function(callback){
	this.model("Purchase").find()
	.where("buyer").equals(this._id)
	.populate("product")
	.exec(callback);
};

module.exports = mongoose.model("User", userSchema);
