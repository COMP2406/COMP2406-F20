//Code from: https://stackabuse.com/how-to-use-module-exports-in-node-js/
// book_recommendations.js

// stores the favorite author in a constant variable
let x = 5;
const favoriteAuthor = { name: "Ken Bruen", genre: "Noir", nationality: "Irish" };

// returns the favorite book
function favoriteBook() {
    return { title: "The Guards", author: "Ken Bruen" };
}
 
// returns a list of good books
function getBookRecommendations() {
    return [
        {id: 1, title: "The Guards", author: "Ken Bruen"},
        {id: 2, title: "The Stand", author: "Steven King"},
        {id: 3, title: "The Postman Always Rings Twice", author: "James M. Cain"}
    ];
}
 
// exports the variables and functions above so that other modules can use them
module.exports.favoriteAuthor = favoriteAuthor;
module.exports.favoriteBook = favoriteBook;
module.exports.getBookRecommendations = getBookRecommendations;