// const
const constUserName = 'Max';
// // userName = 'Maximilian';    // Not possible to re assign

// let
let ageLet = 30;
ageLet = 29;    // Possible to re assign the variable

// var vs let
// 1) Value is adjusted globally
var varResult;
let letResult = 2;
function addFunction(a: number, b: number) {
  let result;
  result = a + b;
  varResult = result;
  letResult = result;
  return result;
}

addFunction(2, 4);

console.log("varResult " + varResult);
console.log("letResult " + letResult);

// 2)
// let    Variables are scope declared
// var    Variables are global declared
if (ageLet > 20) {
  // let letIsOld = true;
  var varIsOld = true;
}
// console.log("letIsOld " + letIsOld);   // An error from the compiler is thrown
// console.log("varIsOld " + varIsOld);      // An error from the compiler is thrown, although valid in JS

// Arrow functions
// 1) 'function' keyword isn't used
// 2) if function's body has got just 1! line --> {} for function's block is unnecessary &  Implicit return statement
const addArrowFunction = (a: number, b: number = 1) => a + b;
// Default function parameters is valid for any kind of functions. Normally, set as right side

// Type assignment to the function is valid also
const printOutput: (a: number | string) => void = output => console.log(output);

// const button = document.querySelector('button');

// if (button) {
//   TS also infers arrow functions' types
//   button.addEventListener('click', event => console.log(event));   // TS infers 'event' type
// }

// printOutput(add(5));

const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];

activeHobbies.push(...hobbies);

const person = {
  firstName: 'Max',
  age: 30
};

const copiedPerson = { ...person };

const add = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};

const addedNumbers = add(5, 10, 2, 3.7);
console.log(addedNumbers);

const [hobby1, hobby2, ...remainingHobbies] = hobbies;

console.log(hobbies, hobby1, hobby2);

const { firstName: userName, age } = person;

console.log(userName, age, person);