// Define the union of several types, separated by |
function combine(input1: number | string, input2: number | string) {
  let result;
  // Common operators can't be used for union types, since it's necessary specify the type
  // input1 + input2;

  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  // also valid although you specify different type for each argument
  if (typeof input1 === 'number' && typeof input2 === 'string'){
    result = input1 + input2;
  }
  return result;
}

// Invoke sending different type of arguments
// 1) arguments are number
const combinedAges = combine(30, 26);
console.log(combinedAges);

// 2) arguments are string
const combinedNames = combine('Max', 'Anna');
console.log(combinedNames);

// 3) different types for each argument
const combinedTypes = combine(2, 'Alfredo');
console.log(combinedTypes);
