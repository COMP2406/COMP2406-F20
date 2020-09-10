let x = 10;
if (true) {
  let y = 20;
  var z = 30; //again - skip using 'var' in almost all cases
  console.log(x + y + z); // → 60
}
console.log(x + z); // → 40



for(let a = 0; a < 10; a++){ /*do nothing*/ }
//console.log(a) // → error



func1(1,2) // → 10
//innerfunc(5) // → error
function func1(a, b){
	let c = 3;
	function innerfunc(d){
		console.log(a + b + c + d);
	}
	innerfunc(4);
	x = 4;
}
console.log(x); //4



console.log(getRectArea(4,5)); //5, 20, error
function getRectArea(width, height){
    return width * height;
}
