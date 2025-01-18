function add(n1: number, n2: number, printResult: boolean, phrase: string) {
  console.log(typeof n1);
  if (printResult) {
    console.log(phrase + (n1 + n2));
  } else {
    return n1 + n2;
  }
}
const num1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = "Result is: ";
const result = add(num1, number2, printResult, resultPhrase);
