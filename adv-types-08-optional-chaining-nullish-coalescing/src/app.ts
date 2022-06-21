// custom types
type Admin = {
  name: string;
  privileges: string[];
};
// Same, but via interface
// interface Admin  {
//   name: string;
//   privileges: string[];
// };

type Employee = {
  name: string;
  startDate: Date;
};
// Same, but via interface
// interface Employee {
//   name: string;
//   startDate: Date;
// };

// Ways to create an intersection types
// 1) interface which extends from the previous ones
// interface ElevatedEmployee extends Employee, Admin {}

// 2) & of custom types
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date()
};

// Union types
type Combinable = string | number;
type Numeric = number | boolean;

// Intersection of union types is also possible
type Universal = Combinable & Numeric;

// Function overload
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
// Depending on the arguments' type, will be invoked the next one
function add(a: Combinable, b: Combinable) {
  // In union types, it's necessary type guard; which are if validations
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add('Max', ' Schwarz');
// If there is just exist add(a: Combinable, b: Combinable), which returns a Combinable
// --> to use .split method, you would need to cast
// const result = add('Max', ' Schwarz') as string;
result.split(' ');
console.log("result split ", result);
const resultAddition = add(2, 3);
console.log("resultAddition ", resultAddition);
const resultNumberAndString = add(2, 'Alfredo');
console.log("resultNumberAndString ", resultNumberAndString);

// Optional Chaining - ? -
// Uses
// 1) You don't know if the data could come
const fetchedUserData = {
  id: 'u1',
  name: 'Max',
  job: { title: 'CEO', description: 'My own company' }
};

// JS workaround
// console.log(fetchedUserData && fetchedUserData.job && fetchedUserData.job.title);
console.log(fetchedUserData?.job?.title);

// Nullish coalescing ??
// It also exists in JS
function nullishCoallescingFunction(userInput: any) {
  const storedData = userInput ?? 'DEFAULT';
  console.log('nullishCoallescingFunction ' + storedData);
}
nullishCoallescingFunction(null);
nullishCoallescingFunction(undefined);
nullishCoallescingFunction('');
nullishCoallescingFunction(' ');
nullishCoallescingFunction(' Alfredo ');

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name);
  if ('privileges' in emp) {      // Type guard, since the next property is just in case it's an Employee.  in  JS keyword
    // if (typeof emp === 'Employee'){    // Another way to make the type guard
    console.log('Privileges: ' + emp.privileges);
  }
  if ('startDate' in emp) {       // Type guard, since the next property is just in case it's an Admin.   in  JS keyword
    // if (typeof emp === 'Admin') {      // Another way to make the type guard
    console.log('Start Date: ' + emp.startDate);
  }
}

printEmployeeInformation(e1);
printEmployeeInformation({ name: 'Manu', startDate: new Date() });

class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }

  loadCargo(amount: number) {
    console.log('Loading cargo ...' + amount);
  }
}

type Vehicle = Car | Truck;   // For classes

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {       // Type guard, since the next property is just in case it's an Admin.   instanceof  JS keyword
    // if ('loadCargo' in vehicle) {    // Another way to make the type guard
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  // Get the proper speed depending on the animal
  // 1) Type guards
  // if ('flyingSpeed' in animal) {
  //   speed = animal.flyingSpeed;
  // } else if ('runningSpeed' in animal) {
  //   speed = animal.runningSpeed;
  // }
  // 2) extra property 'type' to filter in. Discriminated union
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }
  console.log('Moving at speed: ' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 10});

// Ways to casting
// 1) <TypeToCast>
// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;   // !    Indicate to TS that it's managed by us, and it won't be never null
const userInputElementWithoutForcingTheType = document.getElementById('user-input');   // TS isn't able to identify HTML element's type

// if (userInputElementWithoutForcingTheType) {
//   userInputElementWithoutForcingTheType.value = 'Hi there!';    // Invalid for HTMLElement
// }

// 2) as TypeToCast
if (userInputElementWithoutForcingTheType) {
  (userInputElementWithoutForcingTheType as HTMLInputElement).value = 'Hi there!';
}

interface ErrorContainer { // { email: 'Not a valid email', username: 'Must start with a character!' }
  [prop: string]: string;   // Array of properties with key and value as strings, but without knowing the property's names
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email!',
  username: 'Must start with a capital character!'
};
console.log("errorBag ", errorBag); // TODO: Why debugging it, it's an Object, instead of ErrorContainer?
