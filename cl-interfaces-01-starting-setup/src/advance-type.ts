/**
 * Represents an admin user with specific privileges.
 * 
 * @property {string} name - The name of the admin.
 * @property {string[]} privileges - A list of privileges assigned to the admin.
 */
type admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name:string;
    startDate: Date;
}

type elevatedEmployee = admin & Employee;


// elevatedEmployee is a type that combines the properties of the admin and Employee types.
const e1: elevatedEmployee = {
    name: 'Max',
    privileges: [' create-server'],
    startDate: new Date()
}

type Combinable = string | number | boolean;
type Numeric = number | boolean;
type objecto = object | string[];

type Universal = Combinable & Numeric & objecto; 

// The Universal type is a type that combines the properties of the Combinable, Numeric, and object types.

function adding(a: boolean, b: boolean): string;
function adding(a: string, b: string): string;
function adding(a: string, b: number): string;
function adding(a: number, b: string): string;
/**
 * Adds two values together. If both values are numbers, their sum is returned.
 * If either value is a string, both values are concatenated as strings.
 * If neither of the above conditions are met, the logical AND of the two values is returned.
 *
 * @param {Combinable} a - The first value to add. Can be a string or a number.
 * @param {Combinable} b - The second value to add. Can be a string or a number.
 * @returns {Combinable} The result of adding or concatenating the two values, or their logical AND.
 */
function adding(a:Combinable,b:Combinable){
    if(typeof a === 'string' || typeof b === 'string'){
        return a.toString() + b.toString();
    }
    if(typeof a === 'number' && typeof b === 'number'){
        return a + b;
    }       
    return a && b;
}

const result = adding('Max',2);
result.split(' ');



const fetchUserData = {
    id: 'u1',
    name: 'Max',
    job: {title: 'CEO', description: 'My own company'}
};

console.log(fetchUserData?.job?.title); 

const userInput = '';
const storedData = userInput ?? 'DEFAULT';

console.log(storedData);    // DEFAULT  


// type unknownEmployee = Employee | admin;


// function printEmployeeInformation(emp: unknownEmployee){
//     console.log('Name: ' + emp.name);
//     if('privileges' in emp){ // check if the object has the property privileges
//         // if we don't check if the object has the property privileges, we will get an error
//         // because the Employee type does not have the privileges property.
//         console.log('Privileges: ' + emp.privileges);
//     }
//     if('startDate' in emp){ // check if the object has the property startDate
//         console.log('Start Date: ' + emp.startDate);
//     }   
    
// }


// printEmployeeInformation({name: 'Manu', startDate: new Date()});


// let result = adding('Max','Schwarz');

// let result2 = adding(2,3);

// class Car {
//     id: string;
//     name: string;
//     model: string;
//     numWheels: number = 4;

//     constructor(protected readonly i:string,n: string, m: string){
//         this.id = i;
//         this.name = n;
//         this.model = m;
//     }

//     drive(){
//         console.log('Driving...');
//     }
//     setnumWheels(value: number){
//         if(value % 2 === 0){
//             this.numWheels = value;
//         }else{
//             throw new Error('The number of wheels must be even');
//         }
//     }
// }   

// class truck  extends Car{

    
//     constructor(i:string,n: string, m: string){
//         super(i,n,m);
//     }

//      loadCargo(amount: number){
//         console.log('Loading cargo...' + amount);
//     }
    
// }   

// class convertible extends Car{
//     constructor(i:string,n: string, m: string){
//         super(i,n,m);
//     }
//     drive(){
//         console.log('Driving a convertible...');
//     }

//     openRoof(){
//         console.log('Opening roof...');
//     }
// }

// type Vehicle = Car | truck | convertible;


// const v1 = new convertible('911','v1','Porsche');
// const v2 = new truck('911','v2','Ford');

// function useVehicle(vehicle: Vehicle){


//         vehicle.drive();
    
//         if(vehicle instanceof truck){ // check if the object is an instance of the truck class
//             vehicle.loadCargo(1000);
//         }
//         if(vehicle instanceof convertible){ // check if the object is an instance of the convertible class
//             vehicle.openRoof();
//         }
// }   


// useVehicle(v1);

// useVehicle(v2);


// interface Bird {
//     type: 'bird';
//     flyingSpeed: number;
// }

// interface Horse {
//     type: 'horse';
//     runningSpeed: number;
// }

// type Animal = Bird | Horse;


// function moveAnimal(animal: Animal){
//     let speed;

//     if('flyingSpeed' in animal){
//         speed = animal.flyingSpeed;
//     }
//     if('runningSpeed' in animal){
//         speed = animal.runningSpeed;
//     }
//     console.log('Moving at speed: ' + speed);

// }

// const userInputElement = document.getElementById('user-input')! as HTMLInputElement;
// const userInputElement2 = document.getElementById('user-input');
// if(userInputElement2){
//     (userInputElement2 as HTMLInputElement).value = 'Hi there!';
// }

// userInputElement.value='Hi there!';

// interface ErrorContainer { // { email: 'Not a valid email', username: 'Must start with a character'} 
//     id: number;
//     [prop: string]: number | string;
// }


// const errorBag: ErrorContainer = {
//     id: 1,
//     email: 'Not a valid email',
//     username: 'Must start with a character'
// }