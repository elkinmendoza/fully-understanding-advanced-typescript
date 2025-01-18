// Code goes here!


const userName = 'Max';
let age = 30;
age = 29;

// function add(a: number, b: number) {
//   var result;
//   result = a + b;
//   return result;
// }   

// if( age > 20) {
//     var isOld = true;
// }

//     console.log(isOld);


const add = (a: number, b: number ) =>{return a + b;};  /* without default value */
const add2 = (a: number=2, b: number = 10) =>{return a + b;}; /* with default value of b*/
const printResult= (num: number):void => {console.log('Result: ' + num);};

const printResult3: (num: number) => void = num => {console.log('Result: ' + num);};

const printResult2 = (num: number) => {console.log('Result: ' + num);};

const button = document.querySelector('button')!;

button.addEventListener('click', event => {

    console.log(event)

});

printResult3(add2(12));

const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];

activeHobbies.push(...hobbies);
