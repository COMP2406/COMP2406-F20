
let obj = {
	name: "Dave",
	age: 127,
	getOlder: function(){ this.age = this.age + 1;},
	saySomething: () => {console.log(`Hi, I'm ${this.name}`)}
}

console.log(obj.name);
console.log(obj.age);
obj.getOlder();
console.log(obj.age);
obj.saySomething();
obj.name = "Greg";
obj.saySomething();
