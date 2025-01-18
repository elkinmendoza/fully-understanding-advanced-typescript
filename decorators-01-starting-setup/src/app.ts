function Logger(logString: string) {
  console.log("LOGGER FACTORY");
  return function (constructor: any) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function <T extends {new(...args:any[]):{name:string}}>(OriginalConstructor: T) {
    return class extends OriginalConstructor {
      constructor(..._:any[]) {
        super();
        console.log("Rendering template...");
        const hookElL = document.getElementById(hookId);
        if (hookElL) {
          hookElL.innerHTML = template;
          hookElL.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

@Logger("logging")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

// const person = new Person();
// console.log(person);

// ---

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator!");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor)  {
  console.log("Accessor decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}
function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}
class Product {
  // @Log
  title: string;
  private _price: number;
  // @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be positive");
    }
  }
  get price() {
    return this._price;
  }
  constructor(title: string, _price: number) {
    this._price = _price;
    this.title = title;
  }

  // @Log3
  getPriceWithTax(@Log4 tax: number, @Log4 tax2: number) {
    return this._price * (1 + tax + tax2);
  }
}


function Autobind(_target:any,_MethodName:string|Symbol,descriptor:PropertyDescriptor){
    const originalMethod = descriptor.value;
    const adjDescriptor:PropertyDescriptor = {
        configurable:true,
        enumerable:false,
        get(){
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    }

    return adjDescriptor;

}

class Printer {
  public message : string;
 
  constructor(message: string) {
    console.log("Creating person object...");
    this.message = message;
  }

  @Autobind
  showmessage() { 
    console.log(this.message);
  }
}   

const printer = new Printer("This is a message");
const button = document.querySelector("button")!;
button.addEventListener("click", printer.showmessage); 


interface ValidatorConfig { // {Course:{title:['required'],price:['positive']}}
    [property: string]: { // Course
        [validatableProp: string]: string[] // ['required','positive']
    }
}

const registeredValidators: ValidatorConfig = {}; // {Course:{title:['required'],price:['positive']}}

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
    };
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
    };
}

function validate(obj:any) {
    const objectValidatorConfig = registeredValidators[obj.constructor.name]; // {title:['required'],price:['positive']}
    if(!objectValidatorConfig){
        return true;
    }

    let isValid = true;
    for(const prop in objectValidatorConfig){
        for(const validator of objectValidatorConfig[prop]){
            switch(validator){
                case 'required':
                    return isValid && !!obj[prop];
                case 'positive':
                    return  isValid && obj[prop] > 0;
            }
        }
    }
    return isValid;
}   

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;
    
    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl  = document.getElementById('title') as HTMLInputElement;
    const priceEl =  document.getElementById('price') as HTMLInputElement;
    
    const title = titleEl.value;
    const price = +priceEl.value;
    
    const createdCourse = new Course(title, price);

    if(!validate(createdCourse)){
        alert("Invalid input, please try again!");
        return;
        
    }
});