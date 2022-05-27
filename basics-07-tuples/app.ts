const personInferringTypes= {
  name: 'Maximilian',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: [2, 'author']       // Infers that it's an array of number or string entries
};
// role can be modified because it's inferred as array
personInferringTypes.role.push('admin');
personInferringTypes.role[1] = 10;
console.log(personInferringTypes.role);

// Indicate explicitly the object type
const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];   // tuple of 2 values of number and string
} = {
  name: 'Maximilian',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: [2, 'author']
};
person.role.push('admin');    // Although it shouldn't be valid, uncaught by TS, because it extends tuple's length
// person.role[1] = 10;
// person.role = [0, 'admin', 'user'];    // Error got because not right length
console.log(person.role);


let favoriteActivities: string[];
favoriteActivities = ['Sports'];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
  // console.log(hobby.map()); // !!! ERROR !!!
}
