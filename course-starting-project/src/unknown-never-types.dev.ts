let userInput: unknown;
let userName: string;



userInput = 5;
userInput = 'Max';

if (typeof userInput === 'string') {
    userName = userInput;
}   


// This is a never type
// This function never returns anything
// This function never produces a value
// This function never produces an end
// This function never produces a return value


function generateError(message:string,code:number) :never{
    throw {message:message, errorCode: code};
}   

const errorResult = generateError('An error occurred!', 500);;
console.log(errorResult);
// generateError('An error occurred!', 500);