// Object type inferred and created by typescript
// 1) It's a concrete object type
// 2) Attributes are separated by ';' instead of ','
// const person: {
//   name: string;
//   age: number;
// } = {
const person = {
  name: 'Maximilian',
  age: 30
};

console.log(person);
console.log(person.name);

// We get an error in compilation time, since the attribute doesn't exit
// A proof that it's not any object, it's a concrete object
// console.log(person.nickName);

// General object type
const personObject : object = {
  name: 'Maximilian',
  age: 30
};

console.log(personObject);
// console.log(personObject.name);  // Generic object -->  no type of property is supported

// We get an error in compilation time, since the attribute doesn't exit
// A proof that it's not any object, it's a concrete object
// console.log(personObject.nickName);

// Another general object type
// Without specifying the key pairs, just inferred
const personObject2 : {} = {
  name: 'Maximilian',
  age: 30
};

console.log(personObject2);
// console.log(personObject2.name);  // Generic object -->  no type of property is supported

// We get an error in compilation time, since the attribute doesn't exit
// A proof that it's not any object, it's a concrete object
// console.log(personObject2.nickName);

// Another general object type
// If you specify mapping for key pairs not existing in the object --> You get an error
// const personObject3 : {
//   name: string
// } = {
//   name: 'Maximilian',
//   age: 30       // error is thrown here because no key pair age is identified
// };

// console.log(personObject3);
// console.log(personObject3.name);  // Generic object -->  no type of property is supported

// We get an error in compilation time, since the attribute doesn't exit
// A proof that it's not any object, it's a concrete object
// console.log(personObject3.nickName);

// Specific object type, typing the attributes === without inferring the types
const personObject4 : {
  name: string;
  age : number
} = {
  name: 'Maximilian',
  age: 30       // error isn't thrown here because key pair age is identified
};

console.log(personObject4);
console.log(personObject4.name);

// We get an error in compilation time, since the attribute doesn't exit
// A proof that it's not any object, it's a concrete object
// console.log(personObject4.nickName);


// Specific object type, typing and specifying the key pairs
// const personObject5 : {
//   name: string;
//   age : 31
// } = {
//   name: 'Maximilian',
//   age: 30       // error is thrown here because key pair age is specified / hardcoded the value
// };

// console.log(personObject5);
// console.log(personObject5.name);

// We get an error in compilation time, since the attribute doesn't exit
// A proof that it's not any object, it's a concrete object
// console.log(personObject5.nickName);

// Nested objects
const nestedObject = {
  id: 'abc',
  price: 12.99,
  tags: ['great-offer', 'hot-and-new'],
  details : {
    title: 'Red Carpet',
    description: 'A great carpet - almost brand - new!'
  }
}
console.log(nestedObject);
console.log(nestedObject.tags[0]);
console.log(nestedObject.details.title);