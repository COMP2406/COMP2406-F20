function onclickTest(){
    document.getElementById("idExample").innerHTML=" but i just wanna show you how it works";
};

function onchangeTest(select){
    var option=select.value;
    document.getElementById("optionOut").innerHTML=" you have choosed "+option;
}

function init(){
    let divEx=document.getElementById("eventBubbleExampleDiv");
    let spanEx=document.getElementById("eventBubbleExampleSpan");
    let pEx=document.getElementById("eventBubbleExampleP");
    divEx.addEventListener("click",function(){
        noPropagation(divEx);
    });

    spanEx.addEventListener("click",function(){
        noPropagation(spanEx)
    });
    pEx.addEventListener("click",function(){
        noPropagation(pEx)
    });
    //Note!!! you HAVE TO create a function here, otherwise your
    //javascript will invoke the function and return the value of the function
    //as a parameter of addEventListner()
    let divEx1=document.getElementById("eventBubbleExampleDiv1");
    let spanEx1=document.getElementById("eventBubbleExampleSpan1");
    let pEx1=document.getElementById("eventBubbleExampleP1");
    divEx1.addEventListener("click",function(){
        noPropagation(divEx1);
    });
    document.get

    spanEx1.addEventListener("click",function(){
        event.stopPropagation();
        alert(spanEx1.tagName+" is clicked and  event.stopPropagation() is called ");
    });
    pEx1.addEventListener("click",function(){
        noPropagation(pEx1)
    });

}
function noPropagation(element){
    alert(element.tagName+" is clicked");
}

