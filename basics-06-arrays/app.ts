const person = {
  name: 'Maximilian',
  age: 30,
  hobbies: ['Sports', 'Cooking']  // Infer the type of the array's entries
};

console.log(person.name);
// person.hobbies[2] = 4;    // Error in compilation, because the type is inferred and strict

//  iterate through array's elements
for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());   // type of the array's entries are inferred --> No error about methods to use
  // console.log(hobby.map());        // type of the array's entries are inferred --> map doesn't exist for string
}

let favoriteActivities: string[];   // strict type for the array's entries
// favoriteActivities = 'Sports';    // Error in compilation time because it's different type
favoriteActivities = ['Sports'];

let noFavoriteActivities: any[];    // flexible type for the array's entries
noFavoriteActivities = ['Golf', 2]; // different types for the array's entries can be specified
console.log(noFavoriteActivities[0]);
console.log(noFavoriteActivities[1]);
