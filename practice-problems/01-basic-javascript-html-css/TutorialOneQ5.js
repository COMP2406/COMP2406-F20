//students contains an array of Javascript objects
//Each object has the following properties:
//1. fname (string) - the first name of the student
//2. lname (string) - the last name of the student
//3. snum (string) - the student's student number
//4. agrade (number) - the student's assignment grade
//5. tgrade (number) - the student's tutorial grade
//6. egrade (number) - the student's exam grade
//The first two student object entries have been formatted
// to allow you to see the structure a bit better.
let students = [
	{
		fname: "Jane", 
		lname: "Brazier", 
		snum: "100366942", 
		agrade: 67.59127376966494, 
		tgrade: 64.86530868914188, 
		egrade: 70.52944558104066
	}, 
	{
		fname: "Ricardo", 
		lname: "Allen", 
		snum: "100345641", 
		agrade: 65.80370345301014, 
		tgrade: 75.40211705841241, egrade: 55.39348896202821
	}, 
	{fname: "Mary", lname: "Hernandez", snum: "100221207", agrade: 71.20761408935981, 
	tgrade: 71.37529197926764, egrade: 75.82038980457698}, 
	
	{fname: "James", lname: "Johnson",
	snum: "100200842", agrade: 72.5791318299902, tgrade: 81.65883679807183, egrade: 85.19664228946989},
	{fname: "Stephanie", lname: "Ottesen", snum: "100225067", agrade: 88.19738810849226, 
	tgrade: 84.68339894849353, egrade: 82.23947265645927}, 
	{fname: "Martin", lname: "Conway", 
	snum: "100358379", agrade: 71.28759059295344, tgrade: 79.13194908266965, egrade: 77.61880623797336}, 
	{fname: "Andrew", lname: "Weaver", snum: "100376243", agrade: 70.01798139244363,
	tgrade: 78.64811561086252, egrade: 78.68650242850617}, 
	{fname: "Rhonda", lname: "Ford", snum: "100296902", agrade: 56.14580882764524, tgrade: 63.9209865108888,
	egrade: 60.186613967770334}, 
	{fname: "Leonard", lname: "Arvan", snum: "100220616", 
	agrade: 80.67865525396981, tgrade: 92.73557717342663, egrade: 88.32126970338336}, 
	{fname: "William", lname: "Culler", snum: "100307637", agrade: 65.75251699043244, 
	tgrade: 62.18172136246404, egrade: 63.065185542933094},
	{fname: "David", lname: "Nakasone", 
	snum: "100353719", agrade: 62.63260239883763, tgrade: 58.352794766947866, egrade: 59.80461902691901},
	{fname: "Maria", lname: "Young", snum: "100311331", agrade: 70.13767021264486, 
	tgrade: 76.09348747016176, egrade: 79.99207130929622}, 
	{fname: "Beverly", lname: "Mott",
	snum: "100325579", agrade: 83.08140516644137, tgrade: 94.80666640692787, egrade: 85.15875656837004},
	{fname: "Patrick", lname: "Francis", snum: "100257773", agrade: 66.79534616079296,
	tgrade: 47.744928296560076, egrade: 64.05723052865763},
	{fname: "Tracy", lname: "Bonds",
	snum: "100233277", agrade: 70.2289028670531, tgrade: 65.32258294210156, egrade: 77.04816321925091}, 
	{fname: "Richard", lname: "Akers", snum: "100216705", agrade: 52.446722363991015,
	tgrade: 49.205597783687374, egrade: 53.72940974941982}, 
	{fname: "Beatrice", lname: "Jaco", 
	snum: "100233935", agrade: 81.89338938644417, tgrade: 71.05459078971688, egrade: 83.08235397281308}, 
	{fname: "Guy", lname: "Wendelin", snum: "100336379", agrade: 68.17788319655493,
	tgrade: 63.82273085525137, egrade: 68.31559946786807},
	{fname: "Logan", lname: "Olsen",
	snum: "100265736", agrade: 59.89037739094347, tgrade: 71.76550299333657, egrade: 64.61665695830132},
	{fname: "Gene", lname: "Jeanlouis", snum: "100341666", agrade: 74.16481515505846,
	tgrade: 68.20592386917109, egrade: 78.25975050135006}]



let x=[];
let t=[];
let Main=[];
let Average=[];
let a=0;
for (i=0; i<students.length; i++){
	x[i]=(myFirstName(i));
	t[i]=(checkGrade(i));
	Main[i]=Student(i);
}

function myFirstName(One){
		return(students[One].fname);
}

function checkGrade(x){
		if(students[x].egrade>80){
			let A;		
			A=students[x].fname+" "+students[x].lname
			return(A);
		}
}

function Undefined(remove){
	return(remove!==undefined);
}

function Student(NumberOne){
	return(students[NumberOne]);
}
let MainTwo=Main.map(FinaleGrade);


function FinaleGrade(Name){
	let Fgrade=(Name.agrade*.40)+(Name.egrade*.50)+(Name.tgrade*.10);
	Average[a]=(Fgrade);
	a=a+1;
	return(Name.fname +" " +Name.lname+" "+ Fgrade);
}


let sum=Average.reduce(Total);
function Total(a,b){
	console.log(a +b);
	return(a+b);
}

t=t.filter(Undefined);
console.log("-----------------------------------------");
console.log(t);
console.log("-----------------------------------------");
console.log(x); 
console.log("-----------------------------------------");
console.log(MainTwo);



console.log("Class average is " +sum/20);











