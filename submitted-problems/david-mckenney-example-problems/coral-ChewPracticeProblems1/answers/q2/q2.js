// Answer to question 2

let recipes = [];

function init() {
    loadPage();

    document.getElementById("btn").addEventListener("click", addRecipe);
}

function loadPage() {
    let div = document.getElementById("info");
    
    let lbl_res = document.createElement("label");
    lbl_res.innerText = "Enter recipe name: ";
 
    let name = document.createElement("input");
    name.id = "txt_name";
    name.type = "text";

    let br = document.createElement("br");

    let lbl_serv = document.createElement("label");
    lbl_serv.innerText = "Enter serving size: ";

    let serv = document.createElement("input");
    serv.id = "txt_serv";
    serv.type = "text";

    let br2 = document.createElement("br");

    let lbl_ingr = document.createElement("label");
    lbl_ingr.innerText = "Enter ingredients: ";

    let ingr = document.createElement("input");
    ingr.id = "txt_ingr";
    ingr.type = "text";

    let br3 = document.createElement("br");

    let btn = document.createElement("button");
    btn.id = "btn";
    btn.type = "submit";
    btn.innerText = "Submit"

    let br4 = document.createElement("br");
    let br5 = document.createElement("br");
    
    let lbl_cook = document.createElement("label");
    lbl_cook.innerText = "Cook Book:";

    let br6 = document.createElement("br");

    let list = document.createElement("div");
    list.id = "list";
   
    div.appendChild(lbl_res);
    div.appendChild(name);
    div.appendChild(br);
    div.appendChild(lbl_serv);
    div.appendChild(serv);
    div.appendChild(br2);
    div.appendChild(lbl_ingr);
    div.appendChild(ingr);
    div.appendChild(br3);
    div.appendChild(btn);
    div.appendChild(br4);
    div.appendChild(br5);
    div.appendChild(lbl_cook);
    div.appendChild(br6);
    div.appendChild(list);

}

function addRecipe() {
    let name = document.getElementById("txt_name").value;
    let serving = document.getElementById("txt_serv").value;
    let ingredients = document.getElementById("txt_ingr").value.trim().split(",");
    
    recipes.push({"name": name, "serving": serving, "ingredients": ingredients});
    
    document.getElementById("txt_name").value = "";
    document.getElementById("txt_serv").value = "";
    document.getElementById("txt_ingr").value = "";
    
    displayCookBook();

}

function displayCookBook() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    let ul = document.createElement("ul");

    for (let i =  0; i < recipes.length; i++) {
        let li = document.createElement("li");
        li.innerText = recipes[i].name;

        let li2 = document.createElement("li");
        li2.innerText = "Servings: "+ recipes[i].serving;

        let li3 = document.createElement("li");
        li3.innerText = "Ingredients: ";

        let sub_ul = document.createElement("ul");
        
        let ingr = recipes[i].ingredients;
        Object.keys(ingr).forEach(function(itemID){
            let sub_li = document.createElement("li");
            sub_li.innerText = ingr[itemID];
            sub_ul.appendChild(sub_li);
        });

        li3.appendChild(sub_ul);
        ul.appendChild(li);
        ul.appendChild(li2);
        ul.appendChild(li3);
    } 

    list.appendChild(ul);
    document.getElementById("info").appendChild(list);   
}