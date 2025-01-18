/**
 * Selects the first button element in the document.
 * The '!' symbol is a non-null assertion operator in TypeScript.
 * It tells the TypeScript compiler that the expression before it will not be null or undefined.
 * This is useful when you are certain that the element exists in the DOM, 
 * and you want to avoid TypeScript errors related to potential null or undefined values.
 */

let Appid = "app";  

const button = document.querySelector("button")!;

function add(n1: number, n2: number) {
  if (n1 + n2 > 0) {
    return n1 + n2;
  }else{
    return
  }
} 

function clickhandler  (message: string) {
  console.log("Clicked! " + message);
}

button.addEventListener("click", clickhandler.bind(null, "You're welcome!"));

const map = new Map();
map.set("name", "Max");
console.log(map);