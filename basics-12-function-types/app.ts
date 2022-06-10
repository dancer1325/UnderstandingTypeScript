// Function return type can be inferred by Typescript
function add(n1: number, n2: number) {
  return n1 + n2;
}

// You can indicate the type to return
function addIndicatingReturnType(n1: number, n2: number): number {
  return n1 + n2;
}

// void return type which doesn't exist in JS
function printResult(num: number): void {
  console.log('printResult - Result: ' + num);
}

// undefined return type
// return statement is necessary
// Compiling in JS, it would be similar to the previous function
function printResultUndefined(num: number): undefined {
  console.log('printResultUndefined - Result: ' + num);
  return;
}

let printedResult = printResult(add(5, 12));
// [TS] void --> [JS] undefined (which it's a real value)
console.log("printedResult" + printedResult);

// undefined  is a type in TS
let someValue: undefined;

// Declaring a variable without indicating the type --> any
let variableToDeclareFunctions;
// type can be changed continuously
variableToDeclareFunctions = add;
// variableToDeclareFunctions = 5;
// TS doesn't recognize in compile time if there is an error, just in run time
console.log("variableToDeclareFunctions(1, 2)" + variableToDeclareFunctions(1, 2));

// Function is a type in TS
let variableDeclaredAsFunction: Function;
variableDeclaredAsFunction = add;
// variableDeclaredAsFunction = 5;          // TS identifies that it's not a function
variableDeclaredAsFunction = printResult;
// It's not an error, but since it's any, it doesn't check the arguments when you invoke it
console.log("variableDeclaredAsFunction(9, 9) " + variableDeclaredAsFunction(9, 9));

// Specifying that it's a function with a specific arguments and type to return
let combineValues: (a: number, b: number) => number;
// function can be stored as a variable
combineValues = add;
// combineValues = printResult;
// combineValues = 5;
console.log("combineValues(8, 8) " + combineValues(8, 8));

// cb Call back. Obviously, it can be named as you want
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10, 20, (result) => {
  console.log("addAndHandle - result " + result);
  return result;    // cb was declared without returning anything (void)
  // TS doesn't identify it as an error, and no problem with it
});
// If you add different number of call back's arguments --> TS identifies the error
// addAndHandle(10, 20, (result, b) => {
//   console.log("addAndHandle - result " + result);
// });