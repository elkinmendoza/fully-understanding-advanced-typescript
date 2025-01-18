type Combinable = [number | string];
type cominnable2= string[] | number[];
type ConversionDescriptor = 'as-number' | 'as-text';
type User = {name: string | number, age: number|string};

function combine(
    input1: Combinable,
     input2: Combinable,
    resultConversion: 'as-number' | 'as-text'
    ) {
        let result
    if(typeof input1 === 'number' && typeof input2 === 'number') {
         result = input1 + input2;
    }else{
         result = input1.toString() + input2.toString();
    }
    if(resultConversion === 'as-number') {
        return +result;
    }else if(resultConversion === 'as-text'){
        return result.toString  (); 
    }
}

const combinedAges = combine(30, 26,'as-number');
console.log(combinedAges);

const combineStringAges = combine('30', '26','as-text');

console.log(combineStringAges);

const combinedNames = combine('Max', 'Anna','as-text');
console.log(combinedNames);