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


function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
console.log(mergedObj);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value.';
  if (element.length === 1) {
    descriptionText = 'Got 1 element.';
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements.';
  }
  return [element, descriptionText];
}

console.log(countAndDescribe(['Sports', 'Cooking']));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return 'Value: ' + obj[key];
}

extractAndConvert({ name: 'Max' }, 'name');

class DataStorage<T extends string | number | boolean> {
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

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// const maxObj = {name: 'Max'};
// objStorage.addItem(maxObj);
// objStorage.addItem({name: 'Manu'});
// // ...
// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());

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