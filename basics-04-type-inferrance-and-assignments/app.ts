function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  // if (typeof n1 !== 'number' || typeof n2 !== 'number') {
  //   throw new Error('Incorrect input!');
  // }
  const result = n1 + n2;
  if (showResult) {
    console.log(phrase + result);
  } else {
    return result;
  }
}

let number0 :number= 0; // Redundant and not good practise to indicate the type and initialize it
let number1: number;    // Necessary here to declare the type
number1 = 5;            // Although IDE's hint isn't displayed --> Moving the mouse over, it infers the type
const number2 = 2.8;
const printResult = true;
let resultPhrase = 'Result is: '; // Unnecessary to indicate the type, since it's inferred

add(number1, number2, printResult, resultPhrase);
