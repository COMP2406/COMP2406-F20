console.log(1 + "2");
console.log("10"/5);
console.log(1 == true);
console.log("hello" == true);
console.log("true" == true);
console.log(true == "true");


let obj = {prop1 : 5, prop2: null, prop3: ""};

if(obj.hasOwnProperty("prop2")){
  console.log("Do something");
}
