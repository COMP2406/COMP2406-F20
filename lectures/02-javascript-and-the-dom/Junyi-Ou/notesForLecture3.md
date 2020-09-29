# Lecture 3 notes



## Event based Programming
* Event based  programming is basically, in English, when something happend we respond.
* How?
  * we use EventListeners to respond.

```html
        <div class="classExample">
        <h2 id="idExample">i know this looks awful,
        this is just an example of using id and onclick</h2>
        <button onclick="onclickTest()" > click here</button>
```
             
  * the onclick is our event and onclickTest() is our javascript code
    
```javascript
function onclickTest(){
    document.getElementById("idExample").innerHTML=" but i just wanna show you how it works";
};

``` 
  * when an event is occured, such as clicked in our example
  * There are so man more event out there, use w3school as your reference
  ---
## DOM 
* DOM stands for Document Object Mode.
  * >The Document Object Model (DOM) is a cross-platform and language-independent interface that treats an XML or HTML document as a tree structure where in each node is an object representing a part of the document. 
  by [wikepedia](https://en.wikipedia.org/wiki/Document_Object_Model)
  * Each node/element  will have one parent node/element except for the document element.
  * Each nodes/elements will have zero to multiple children nodes/elements
  ---
* What can we do with DOM?
  * Add/change/remove HTML elements
  ```javascript
  document.getElementById("idExample").innerHTML=" but i just wanna show you how it works";
  ```
  * Respond to actions on HTML elements
  ```HTML
    <button onclick="onclickTest()" > click here</button>
  ```
  * Create a new events to respond to
  ```javascript
  let divEx1=document.getElementById("eventBubbleExampleDiv1");
  ...
  divEx1.addEventListener("click",function(){
        noPropagation(divEx1);
    });
  ``` 
---
## BOM
* BOM stands for Broser Object Model
  * it allows JavaScript to communicate with your brower
  * So you are able to edit ont
    1. window
    2. screen
    3. document inside the window
    4. navigation bar
    5. location or URL
    6. popup boxes, etc.
---
## How to find a element/elements?
  ```javascript
  let idExample=document.getElementById("id");
  ```
  * you must assign an id to an html element~
  ```HTML
  <h2 id="id">i know this looks awful,
            this is just an example of using id and onclick</h2>
  ```
  * you can also use 
  ```javascript
  let classExample=document.getElementsByClassName("classname")
  let tagExample=document.getElementsByTagName("tagName")
  ```
  ---
## Event Propagation
* When an event occurs, if all your elements has the eventListenr added, it will handle the event at the child first and goes all the way up to the parent, and parent's parent.
* Consider an example like this
  ```HTML
  <div class="classExample" id="eventBubbleExampleDiv">
        this is a div without event.stopPropagation();<br>
        <span style="background-color: seashell; color: black;"               id="eventBubbleExampleSpan"><br>
            this is a span without event.stopPropagation();
            <p id="eventBubbleExampleP">this is a paragraph without event.stopPropagation() click here!</p>
        </span>
    </div>
  ```
  where the actionLisners are added as the following
  ```javascript
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
    function noPropagation(element){
    alert(element.tagName+" is clicked");}
  ```
  what would happen when you clicked the paragraph element? Try open the html file in your browser
  ## How do we stop event propagation?
  ```javascript
    let divEx1=document.getElementById("eventBubbleExampleDiv1");
    let spanEx1=document.getElementById("eventBubbleExampleSpan1");
    let pEx1=document.getElementById("eventBubbleExampleP1");
    divEx1.addEventListener("click",function(){
        noPropagation(divEx1);
    });
    document.get

    spanEx1.addEventListener("click",function(){
        event.stopPropagation();// use this function!!!!!!
        alert(spanEx1.tagName+" is clicked and  event.stopPropagation() is called ");
    });
    pEx1.addEventListener("click",function(){
        noPropagation(pEx1)
    });

  ```
  Open your Browser and check whay would happen if you clicked on the second paragraph element
  
