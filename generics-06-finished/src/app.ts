// Generic types
// 1. Array
// const array: Array = [];     // TS requires a type for this generic

// Ways to declare generics
// 1) with []
const arrayWithSquareBrackets: any[] = [];
// 2) with <>
const arrayWithArrowBrackets: Array<any> = [];
// const names: Array<string> = []; // string[]
// // names[0].split(' ');    // TS doesn't throw an error because it's specified the type in generics

// 2. Promise
// Another type related with the generic is the one, returned by the resolve
// const promise: Promise<number> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(10);   // Since the resolve it's simply 10 --> type related with the generic type is number
//   }, 2000);
// });

// promise.then(data => {
//   // data.split(' ');      // TS throws an error because the promise returns a number in the type related to the generic one
// })

function mergeObjects(objA: Object, objB: Object) {
  return Object.assign(objA, objB);   // Merge objects with their properties in a new object
}
const mergedObjects = mergeObjects({name:'Alfredo'}, {age:30});
// mergedObjects.name     // TS throws an error because it doesn't know about the object and their properties
// You could access to the attributes if you would cast
const mergedObjectsCasting = mergeObjects({name:'Alfredo'}, {age:30}) as {name: string, age: number};
console.log("mergedObjectsCasting.name " + mergedObjectsCasting.name);
console.log('mergeObjects ' + mergedObjects);   // Concatenating with a string, just return [object Object]
console.log(mergedObjects);

// Generic function
// TS can infer the type to return
function mergeWithGeneric<T, U>(objA: T, objB: U) {
  // You are indicating the specific type, not objects
  return Object.assign(objA, objB);
}
const mergedObjectWithGenericFunction = mergeWithGeneric({name:'Alfredo'}, {age:30});
// You can access to the properties
console.log("mergedObjectWithGenericFunction.name " + mergedObjectWithGenericFunction.name);
console.log("mergedObjectWithGenericFunction " + mergedObjectWithGenericFunction);
console.log(mergedObjectWithGenericFunction);
// Anytime, you can set any type dynamically, that you want
const mergedObjectWithGenericFunctionViaAnotherTypes = mergeWithGeneric({height:180}, {status:'single'});
console.log("mergedObjectWithGenericFunctionViaAnotherTypes.status " + mergedObjectWithGenericFunctionViaAnotherTypes.status);
// You can specify the generic types invoking it, instead of being inferred by TS
const mergedObjectWithGenericFunctionSpecifyingTpe = mergeWithGeneric<{property: string}, {skill: string}>({property:'Home'}, {skill:'flirt'});
console.log("mergedObjectWithGenericFunctionSpecifyingTpe.skill " + mergedObjectWithGenericFunctionSpecifyingTpe.skill);
// If one of types is a primitive one --> it won't properly merged as another property
const mergedObjectWithGenericFunctionWithBasicType = mergeWithGeneric({property:'Home'}, 30);
console.log("mergedObjectWithGenericFunctionWithBasicType " + mergedObjectWithGenericFunctionWithBasicType);
console.log(mergedObjectWithGenericFunctionWithBasicType);

// Add constraint to the types of a generic function
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
// It throws an error, because the types must be objects
// const mergedObjectWithConstraint = merge({property:'Home'}, 30);
const mergedObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
console.log(mergedObj);
// Constraint can be added to just one of the generic types
function mergeWithOneConstraint<T extends object, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
const mergedObjWithJustOneConstraint = mergeWithOneConstraint({ name: 'Max', hobbies: ['Sports'] }, 30 );
console.log(mergedObjWithJustOneConstraint);

interface Lengthy {
  length: number;
}

// Generic function with constraint of extending from Lengthy
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {   // [,] tuple
  let descriptionText = 'Got no value.';
  if (element.length === 1) {
    descriptionText = 'Got 1 element.';
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements.';
  }
  return [element, descriptionText];
}
// console.log("countAndDescribe " + countAndDescribe(10));     // it doesn't follow the constraint --> it throws an error
console.log("countAndDescribe " + countAndDescribe(['Sports', 'Cooking']));
console.log(countAndDescribe(['Sports', 'Cooking']));

// Generic function with constraint a key of another generic type
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return 'Value: ' + obj[key];
}

// extractAndConvert({ name: 'Max' }, 12);      // it throws an error because keyof constraint isn't followed
extractAndConvert({ name: 'Max' }, 'name');

// Generic class
class DataStorage<T> {
  // Generic types added to attributes
  private data: T[] = [];

  // Generic types added to methods
  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1); // -1
  }

  getItems() {
    return [...this.data];
  }
}
const text = new DataStorage<string>();
text.addItem('Max');
// text.addItem(3);         // Since in the instance has been specified the type --> you can't change it
text.addItem('Manu');
text.removeItem('Max');
console.log(text.getItems());
const number = new DataStorage<number>();
// number.addItem('Max');   // Since in the instance has been specified the type --> you can't change it
number.addItem(3);
number.addItem(10);
number.removeItem(3);
console.log(number.getItems());
const objects = new DataStorage<object>();
// object.addItem('Max');     // Since in the instance has been specified the type --> you can't change it
// object.addItem(3);        // Since in the instance has been specified the type --> you can't change it
objects.addItem({name: 'Alfredo'});
objects.addItem({name: 'Belen'});
console.log(objects.getItems());
objects.removeItem({name: 'Alfredo'});      // It wouldn't remove the object, because JS works with reference types === different objects are
console.log(objects.getItems());
const objectCreated = {name: 'Noelia'};   // It would be removed if you pass the same reference
objects.addItem(objectCreated);
console.log(objects.getItems());
objects.removeItem(objectCreated);    // Here we are passing the same reference
console.log(objects.getItems());

// Generic class with constraints of string, number or boolean
class DataStorageWithConstraints<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1); // -1
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorageWithConstraints<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItems());

const numberStorage = new DataStorageWithConstraints<number>();

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

const names: Readonly<string[]> = ['Max', 'Anna'];
// names.push('Manu');
// names.pop();