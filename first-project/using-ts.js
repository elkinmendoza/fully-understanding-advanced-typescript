/**
 * Adds two numbers together.
 *
 * @param num1 - The first number to add.
 * @param num2 - The second number to add.
 * @returns The sum of the two numbers.
 */
/**
 * The `+` symbol before `input1.value` is a unary plus operator.
 * It converts the string value from the input field to a number.
 * This is necessary because `input1.value` and `input2.value` are strings by default.
 */
var button = document.querySelector("button");
var input1 = document.getElementById("num1");
var input2 = document.getElementById("num2");
function add(num1, num2) {
    return num1 + num2;
}
button.addEventListener("click", function () {
    console.log(add(+input1.value, +input2.value));
});
