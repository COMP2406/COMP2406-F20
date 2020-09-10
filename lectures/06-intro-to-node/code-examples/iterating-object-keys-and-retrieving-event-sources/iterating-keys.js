
//Two ways of iterating over keys in an object

//Define the object
let obj = {
	first_key: "some value",
	second_key: "other value",
	third_key: "something else"
}

//Object.keys(obj) gets an array containing the keys of obj
let keys = Object.keys(obj);
for(let i = 0; i < keys.length; i++){
	console.log(keys[i] + " " + obj[keys[i]]);
}

//Alternative way to iterate over keys of object
for(let key in obj){
	console.log(key + " " + obj[key]);
}

