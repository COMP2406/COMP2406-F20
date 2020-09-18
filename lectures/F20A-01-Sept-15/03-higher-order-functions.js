

let arr = ["cat", "dog", "monkey", "elephant", "horse", "donkey"]
//All three of the below produce identical output


//The argument (word => word.length > 5), is a function!
console.log(arr.filter(word => word.length > 5));

//Identical to above
const filter_func = function(word){
	return word.length > 5;
}
console.log(arr.filter(filter_func));

console.log(
  arr.filter(
		function(word){
			return word.length > 5;
		}
	)
);
