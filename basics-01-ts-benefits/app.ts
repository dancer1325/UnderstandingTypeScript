// function add(n1, n2) { // Add types allowed in TS, to avoid problems
function add(n1: number, n2: number) {
  return n1 + n2;
}

const number1 = 5;
// const number1 = '5'; // Once you type the variables  --> Get a problem in code time in TS
const number2 = 2.8;

const result = add(number1, number2);
console.log(result);