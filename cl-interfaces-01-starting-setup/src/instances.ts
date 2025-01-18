
// type addFn = (a:number, b:number) => number; // type addFn = Function;

/**
 * Represents a function that takes two numbers as arguments and returns a number.
 * 
 * @interface addFn
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The result of the function.
 */
interface addFn {
    (a:number,b:number): number; 
}

let add: addFn;


add = (n1: number, n2: number) => {
    return n1 + n2;
}

let dd=add(2,3);
interface Named {
    readonly name?: string;
    outputName?: string;
}

interface Greetable extends Named {    
    greet(phrase: string): void;

    updateName(name: string): void;
}


class Person implements Greetable {
   name?:string;

   constructor(n?: string){
        if(n){ 

            this.name = n;
        }
    }

    greet(phrase: string): void {
        console.log(phrase + ' ' + this.name);

    }

    updateName(name: string){
        this.name = name;
    }
}

let user1: Greetable;

user1 = new Person();

user1.updateName('Max');

user1.greet('Hi there - I am');
console.log(user1); 