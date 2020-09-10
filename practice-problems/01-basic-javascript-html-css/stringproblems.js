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
      result += "'";
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

  return result

}

console.log("")
console.log(landscape())
