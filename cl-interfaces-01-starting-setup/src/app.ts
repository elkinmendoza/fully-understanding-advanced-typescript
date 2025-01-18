



// const names: Array<string> = [];


// names[0].split(' ');


// const promise:Promise<number> = new Promise((resolve, reject) => {

//     setTimeout(() => {
//         resolve(10);
//     }, 2000);   
    
// });

// promise.then(data => { 
//     return data * 2;
// }   );  


function merge<T extends object, U extends object>(objA: T, objectB: U){  
    return Object.assign(objA,objectB);
}
 const mergedt= merge({name:'Max',hobbies:['Sport']},{age:30});

//  const mergedt = merge<{ name: string; hobbies: string[],duties:string[] }, { age: number }>({ name: 'Max', hobbies: ['Sport'],duties:[] }, { age: 30 });

//  console.log(mergedt);


    interface Lengthy{
        length: number;
    }
function CountandPrint<T extends Lengthy>(element:T):[T,string] {
    let descriptionText = 'Got no value';

    if(element.length === 1){
        descriptionText = 'Got 1 element';
    }
    else if(element.length > 1){
        descriptionText = 'Got ' + element.length + ' elements';
    }   

    return  [element,descriptionText];
}

// console.log(CountandPrint(['Hi there!', 'Max', 'Manu']));
function extractAndConvert<T extends object,U extends keyof T>(obj:T,key:U){
    return 'value ' + [obj[key]];

}

let thisdontknow= extractAndConvert({name:'Max'},'name');


class Storage1<T extends string | number | boolean | object>{
    private data:T[]= [];

    addItem(item: T){
        this.data.push(item);
    }

    removeItem(item: T){
        this.data.splice(this.data.indexOf(item),1);
    }

    getItems(){
        return [...this.data];
    }

}


class DataStorage<T extends string | number | boolean | object>{
    private data:T[]= [];

    addItem(item: T){
        this.data.push(item);
    }

    removeItem(item: T){
        this.data.splice(this.data.indexOf(item),1);
    }

    getItems(){
        return [...this.data];
    }

}



const textStorage = new Storage1<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');

textStorage.removeItem('Max');

console.log(textStorage.getItems());


const objectStorage = new Storage1<object>();

objectStorage.addItem({name:'Max'});
objectStorage.addItem({name:'Manu'});

objectStorage.removeItem({name:'max'});


objectStorage.getItems();



interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(title:string,description:string,date:Date) : CourseGoal{

    let CourseGoalv:Partial<CourseGoal>={}
    CourseGoalv.title = title;
    CourseGoalv.description = description; 
    CourseGoalv.completeUntil = date;
    return CourseGoalv as CourseGoal;

}


const names:Readonly<string[]>= ['Max','Manu'];
// names.push('Anna');