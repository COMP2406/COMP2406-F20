function landscape() {
    let result = "",a=" ";
  
    function flat(size) {
      for (let count = 0; count < size; count++){
        result += "_";
        a+=" ";
      }
    }
    function hill(size) {
      result += "/";
      a+=" ";
      for (let count = 0; count < size; count++){
        a+="_"
        result += " ";
      }
      a+=" "
      result += "\\";
    }
    b=""
    //START BUILD SCRIPT
    flat(3);
    hill(4);
    flat(6);
    hill(1);
    flat(1);
    //END BUILD SCRIPT
    console.log(a,"\n",result);
    return b;
  
  }
  
  console.log("")
  console.log(landscape())