console.log(2 == true);
console.log("2" + 1);
console.log(1 + "2");
console.log ("10"/5);
console.log(1 == true);
console.log("3" == 3);
console.log();
//From https://www.freecodecamp.org/news/js-type-coercion-explained-27ba3d9a2839/
console.log(true + false);
console.log(12 / "6");
console.log("number" + 15 + 3);
console.log(15 + 3 + "number");
console.log([1] > null);
console.log("foo" + + "bar");
console.log('true' == true);
console.log();
console.log(false == 'false');
console.log(null == '');
console.log(!!"false" == !!"true");
console.log([] + null + 1);
console.log([1,2,3] == [1,2,3]);
console.log({}+[]+{}+[1]);
console.log(!+[]+[]+![]);
console.log(new Date(0) - 0);
console.log(new Date(0) + 0);
console.log();
//From Eloquent Javascript
console.log(8 * null)// → 0
console.log("5" - 1)// → 4
console.log("5" + 1)// → 51
console.log("five" * 2)// → NaN
console.log(false == 0)// → true

console.log(5/"a");