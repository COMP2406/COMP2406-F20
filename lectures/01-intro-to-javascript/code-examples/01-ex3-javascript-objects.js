//from eloquent javascript
let object1 = {value: 10};
let object2 = object1;
let object3 = {value: 10};

console.log(object1 == object2);//true
console.log(object1 == object3);//false

object1.value = 15;

console.log(object1.value);//15
console.log(object2.value);//15
console.log(object3.value);//10

//Same rules apply when you pass objects as arguments
//You are passing a reference to the original objects