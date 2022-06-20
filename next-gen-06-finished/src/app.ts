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

const hobbies = ['Sports', 'Cooking', 'Flirting', 'Dance', 'Ride motorbike'];
const activeHobbies = ['Hiking'];

// Although it's a const, arrays are objects === reference values --> If we push, we change the memory, but not the address
//activeHobbies.push(hobbies);                  // It just allows pushing single values per argument
// activeHobbies.push(hobbies[0], hobbies[1]);   // It's valid but you should pass one by one
// Spread Operator
// 1) Pull all the elements in an array
activeHobbies.push(...hobbies);
const activeHobbiesTwo = ['Hiking', ...hobbies];

const person = {
  firstName: 'Max',
  age: 30
};

const copiedPersonByPointer = person;   // Copy a pointer to the same reference in memory
const copiedPerson = { ...person };     // {} creates a new object, pulling out all the key/value pairs

// Rest parameters
// If you don't know the number of accepted parameters --> It's wrapped as array
const addRestParameters = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);    // initial value
};

// You don't pass the arguments as an array, just individually
const addedNumbers = addRestParameters(5, 10, 2, 3.7);
console.log("addedNumbers " + addedNumbers);

// If you know the # of parameters --> you can specify them
const addRestParametersWithLimitedNumber = (...numbers: [number, number, number]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);    // initial value
};

// Here you need to specify the indicated # of arguments
console.log("addRestParametersWithLimitedNumber " + addRestParametersWithLimitedNumber(2,3, 4));

// Destructuring
// 1) For array --> []. Guaranteed order for the extraction
const [hobby1, hobby2, ...remainingHobbies] = hobbies;

console.log("hobbies: " + hobbies, " - hobby1: " + hobby1, " - hobby2: " + hobby2, " - remainingHobbies: " + remainingHobbies);

// 2) For objects -->
// extraction based on attributes' names. Attribute's name: variableToDeclare === alias
const { firstName: userName, age } = person;

console.log(userName, age, person);