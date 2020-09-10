
/*
Card source: https://api.hearthstonejson.com/v1/25770/enUS/cards.json

Each card is a JS object
All have:
	id - string uniquely identifies the card
	artist - string indicating the name of the artist for the cards image
	cardClass - string indicating the class of the card
	set  - string indicating the set the card is from
	type - string indicating the type of the card
	text - string indicating card text
Some have:
	rarity - string indicating the rarity of the card
	mechanics - array of string indicating special mechanics
	
Routes:
	/cards - search all cards (query params: class, set, type, artist)
	/cards/:cardID - specific card with ID=:cardID
*/

const http = require('http');

//Set up the required data
let cardData = require("./cards.json");
let cards = {}; //Stores all of the cards, key=id
cardData.forEach(card => {
	cards[card.id] = card;
});

//Initialize server
const server = http.createServer(function (request, response) {
	response.statusCode = 404;
	response.write("Unknwn resource.");
	response.end();
});

//Start server
server.listen(3000);
console.log("Server listening at http://localhost:3000");