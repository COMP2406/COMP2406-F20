
function foo() {  
	let memory = "hello closure";
	return function bar() {
		console.log(memory);
	}
}
// returns the bar function and assigns it to 'closure’
const closure = foo();
closure(); // hello closure


function filterFactory(minsize, maxsize){
	//remember: minsize/maxsize are variables defined within the scope of filterFactory
	return arr => {
		return arr.filter(word => {return word.length >= minsize && word.length <= maxsize});
	}
}

smallWords = filterFactory(0,4)
bigWords = filterFactory(5,10)
words = ["cat", "ocelot", "tiger", "dog", "fish", "elephant"];
console.log(smallWords(words));
console.log(bigWords(words));
console.log(words.filter(word => {return word.length >= 5 && word.length <= 10}));


function person(initName, initAge){
	let name = initName;
	let age = initAge;
	
	return { //returning an OBJECT that contains functions
		getName: () => { return name; },
		setName: (newName) => {
			name = newName;
		},
		getOlder: () => { age++; },
		getAge: () => { return age; },
	}
}

hank = person("Hank", 15);
console.log(hank.getName());
console.log(hank.name);
console.log(hank.getAge());
hank.getOlder();
console.log(hank.getAge());