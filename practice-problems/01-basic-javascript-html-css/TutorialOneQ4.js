function landscape() {
  let result = "";

  function flat(size) {
    for (let count = 0; count < size; count++){
      result += "_";
	}
  }

  function hill(size) {
    result += "/";
    for (let count = 0; count < size; count++){
		result+=hillOne();			
		//result += "'";
	}
    result += "\\";
  }

  //START BUILD SCRIPT
  flat(3);
  hill(4);
  flat(6);
  hill(1);
  flat(1);
  //END BUILD SCRIPT
  let Split=result.split('');
  
  for(i=0; i<result.length; i++){
	if(Split[i] ==" "){
		Split[i]=("_");	
		}
	else{
		Split[i]=" "

	}
}
Split=Split.join('');	 
console.log(Split);


  return result

}
function hillOne(){
	let space= " "
	return(space);
}


console.log("")
console.log(landscape())