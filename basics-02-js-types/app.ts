function add(n1: number, n2: number) {
  // typeOf Operator built-in JS
  console.log("Type of n1: " + typeof n1);
  console.log("Type of n2: " + typeof n2);
  // if (typeof n1 !== 'number' || typeof n2 !== 'number') {
  //   throw new Error('Incorrect input!');
  // }
  return n1 + n2;
}

const number1 = 5;
const number2 = 2.8;

const result = add(number1, number2);
console.log(result);
