const mc = require("mongodb").MongoClient;
let client;

//Given a DB name, connects to Mongo if necessary and returns the database with that name
function getDB(dbName, callback){
	//If the client is not already connected
	if(!client){
		mc.connect("mongodb://localhost:27017", function(err, c) {
			if (err) {
				console.log("Error in connecting to database");
				console.log(err);
				return callback(err);
			}
			client = c;
			return callback(null, client.db(dbName));
		})
	//If the client is already connected, no need to connect again
	}else{
		return callback(null, client.db(dbName));
	}
}

module.exports = {getDB};