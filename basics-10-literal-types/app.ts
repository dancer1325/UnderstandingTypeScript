// define a constant --> you are defining a literal type
const value = 2.8;    // the type is 2.8, not number

function combine(
  input1: number | string,
  input2: number | string,
  // Ways to pass a variable which can have specific values
  // 1) pass as string
  // resultConversion: string
  // 2) literal type with specific values, via union type
  resultConversion: 'as-number' | 'as-text'
  // 3) creating an enum
) {
  let result;

  // If another no specified value is indicated --> it's thrown an erro in run time
  // if (resultConversion === 'as')

  // 1) In 1 step
  if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
    result = +input1 + +input2;   // + force converting to a number
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;

  // 2) in 2 steps
  // if (typeof input1 === 'number' && typeof input2 === 'number') {
  //   result = input1 + input2;
  // } else {
  //   result = input1.toString() + input2.toString();
  // }
  // if (resultConversion === 'as-number') {
  //   return +result;
  // } else {
  //   return result.toString();
  // }
}

const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);

const combinedStringAges = combine('30', '26', 'as-number');
console.log(combinedStringAges);

const combinedNames = combine('Max', 'Anna', 'as-text');
console.log(combinedNames);
