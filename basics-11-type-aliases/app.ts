// Define an alias / custom type
// Use cases
// 1) They are used commonly such as union type
type Combinable = number | string;  // union type
type ConversionDescriptor = 'as-number' | 'as-text';  // union type

function combine(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescriptor
) {
  let result;
  if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);

const combinedStringAges = combine('30', '26', 'as-number');
console.log(combinedStringAges);

const combinedNames = combine('Max', 'Anna', 'as-text');
console.log(combinedNames);

// 2) object defined as type
type User = {name: string; age: number};
const u1: User = {name: 'Alfredo', age: 30};
// const u2: User = ['Alfredo', 30];    // It's wrong because it requires an object, not an array

type Product = {title: string; price: number;};
// const p1: Product = { title: 'A Book', price: 12.99, isListed: true }
// If you add a property which doesn't exist --> it throws an error

// 2.1] Without defining the custom type, just using an object
// function greet(user: { name: string; age: number }) {
//   console.log('Hi, I am ' + user.name);
// }
//
// function isOlder(user: { name: string; age: number }, checkAge: number) {
//   return checkAge > user.age;
// }

// 2.2] using the object, defined as type
function greet(user: User) {
  console.log('Hi, I am ' + user.name);
}

function isOlder(user: User, checkAge: number) {
  return checkAge > user.age;
}

// Type alias can be defined which it's an union type
type Person = { name: string } | string;
let person1: Person = {name: 'Max'};
// values can be switched between the union one's
person1 = 'Michael';
