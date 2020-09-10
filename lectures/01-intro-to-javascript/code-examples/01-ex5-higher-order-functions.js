


//Filter allows you to generate a new array with elements selected based on a boolean function
//Filter accepts a FUNCTION as an input argument
//For each item in the array, the function is called and given that item as input
//The item is added into the result array if the function returns true

let arr = ["cat", "dog", "monkey", "elephant", "horse", "donkey", "fish"];
//The argument (word => word.length > 5), is a function!
console.log(arr.filter(word => word.length > 5));

//Identical to above
const filter_func = function(word){
	return word.length > 5;
}
console.log(arr.filter(filter_func));








arr = [0, 1, 2, 4, 8]
//Map generates a new array after applying the given function to each element
//It applies the input argument function to each item and generates a new item containing the results
//Again, "x => x * x" is a function using the shorthand notation
console.log(arr.map(x => x * x)); //???

//Reduce executes a 'reducer' function on each value, producing a single output
//Accepts a function with two arguments: the accumulated value and the current item
//Returns the final accumulator value after applying the function to each item in the array
console.log(arr.reduce((accumulator, currentValue) => {return accumulator + currentValue}));

//You can also define the starting value for the accumulator:
//arr.reduce((accumulator, currentValue) => {return accumulator + currentValue;}, 0));

//These can be used to perform complex queries on data without a lot of code
//For example, the sum of the squares of values in arr that are >=2 and < 5:
console.log(arr.filter(x => x >= 2 && x < 5).map(x => x * x).reduce((accumulator, currentValue) => accumulator + currentValue));
//When we start using more complex objects, this will be useful
//The same result can always be done using loops, if that is what you prefer