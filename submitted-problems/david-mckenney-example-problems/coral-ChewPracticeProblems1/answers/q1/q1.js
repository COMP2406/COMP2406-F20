// Answer to question 1

function init() {
    loadPage();

    document.getElementById("btn").addEventListener("click", calcDogAge);
}

function loadPage() {
    let div = document.getElementById("info");
    
    let lbl = document.createElement("label");
    lbl.innerText = "Enter age: ";
 
    let txt = document.createElement("input");
    txt.id = "txt_num";
    txt.type = "text";

    let btn = document.createElement("button");
    btn.id = "btn";
    btn.type = "submit";
    btn.innerText = "Submit"

    let br = document.createElement("br");
    
    let lbl_age = document.createElement("label");
    lbl_age.id = "lbl_age";

    let br2 = document.createElement("br");

    let lbl2 = document.createElement("label");
    lbl2.innerText = "List of You Dog's ages";

    let br3 = document.createElement("br");

    let ul = document.createElement("ul");
    ul.id = "list";

    div.appendChild(lbl);
    div.appendChild(txt);
    div.appendChild(btn);
    div.appendChild(br);
    div.appendChild(lbl_age);
    div.appendChild(br2);
    div.appendChild(lbl2);
    div.appendChild(br3);
    div.appendChild(ul);

}

function calcDogAge() {
    let age = document.getElementById("txt_num").value;
    let dogYears = 7*age;
    let humanYears = dogYears/7;
    document.getElementById("lbl_age").innerText = "Your dog is " + dogYears + " years old in dog years and " + humanYears + " in human years!";
    
    let li = document.createElement("li");
    li.innerText = humanYears;

    document.getElementById("list").appendChild(li);
}