// Decorator is simply a function
// CamelCase pattern for naming
function FirstLogger(constructor: Function) {
  console.log('Logging ...');
  console.log(constructor);   // All the class is logged, not just the constructor
}

@FirstLogger
class FirstPerson{
  name = 'Alfredo';
}
// Without instantiating any class, decorator is invoked, because it's executed when the class
// marked with the decorator is defined

// Decorator Factory
// Be able to configure the decorator
// Accepting other arguments, to pass to the real function - decorator
function Logger(logString: string) {
  console.log('LOGGER FACTORY');
  // returning a function --> it's configurable
  return function(constructor: Function) {
    // You can see here that it's configurable, because you are passing as
    // decorator's argument
    console.log(logString);
    console.log(constructor);
  };
}

// Another decorator function
// hookId  Some place in the HTML
function WithTemplate(template: string, hookId: string) {
  console.log('WithTemplate FACTORY');
  // Generic to indicate that it's a constructor, which at least generate an object with property 'name'
  return function<T extends { new (...args: any[]): { name: string } }>(
      originalConstructor: T
  ) {
    // function which it's the decorator can return things, depending on type of decorator
    // You can return a new constructor function, but extending from the original one
    return class extends originalConstructor {
      // constructor(...args: any[]) {    // Indicate that it's the same as the arguments passed
      constructor(..._: any[]) {          // _ Because the arguments aren't used
        // This logics is just executed when an object is instantiated
        super();  // originalConstructor one
        //Next logic was placed previously outside this return class
        console.log('Rendering template');
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    };
  };
}

// Several decorators can be added
// TODO: Check that the order execution of the decorators is from bottom to top
// @Logger('LOGGING - PERSON')
@Logger('LOGGING')
@WithTemplate('<h1>[WithTemplate] My Person Object</h1>', 'app')
class Person {
  name = 'Alfredo';

  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();  // We instantiate an object, but decorator isn' invoked in this moment
console.log(pers);

// Another decorator factory
function WithFirstTemplate(template: string, hookId: string) {
  console.log('WithFirstTemplate FACTORY');
  return function( _: Function  ) {   // _  not used. But it's necessary to indicate the argument
    const hookEl = document.getElementById(hookId);
    if (hookEl) {
      hookEl.innerHTML = template;
    }
  };
}

@WithFirstTemplate('<h2>[WithFirstTemplate] My Person Object</h2>', 'app2')
class PersonWithFirstTemplate {
  name = 'Alfredo2';

  constructor() {
    console.log('Creating person object...');
  }
}

// Another decorator factory
// Replace the content of the template
function WithSecondTemplate(template: string, hookId: string) {
  console.log('WithSecondTemplate FACTORY');
  return function( constructor: any  ) {   // any   Consider that it's a normal function, to use a constructor
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h3')!.textContent = p.name; // Replace the content of the template
    }
  };
}

@WithSecondTemplate('<h3>[WithSecondTemplate] My Person Object</h3>', 'app3')
class PersonWithSecondTemplate {
  name = 'Alfredo3';

  constructor() {
    console.log('Creating person object...');
  }
}
const personWithSecondTemplate = new PersonWithSecondTemplate();

// ---

// Property Decorators
// They have got specific arguments
// target: 1) if static member --> constructor function of the class, or 2) if instance member --> prototype of the class
// propertyName: string or Symbol. Whatever we use to define the property
// Invoked, when the class with these decorators is declared
function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator!');
  console.log(target, propertyName);
}

// Accessor Decorators
// Valid for accessor methods (getters / setters)
// target: 1) if static member --> constructor function of the class, or 2) if instance member --> prototype of the class
// propertyName: string or Symbol. Whatever we use to define the property
// descriptor: Descriptor of the property. It already appears on JS https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}
// Same, but returning the propertyDescriptor
// function Log2ReturningPropertyDescriptor(target: any, name: string, descriptor: PropertyDescriptor): PropertyDescriptor {
//   console.log('Accessor decorator!');
//   console.log(target);
//   console.log(name);
//   console.log(descriptor);
//   return { enumerable: false, configurable: true};
// }

// Method Decorator
// target: 1) if static member --> constructor function of the class, or 2) if instance member --> prototype of the class
// name: Method's name
// descriptor: Descriptor of the method
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log('Method decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// Parameter Decorator
// target: 1) if static member --> constructor function of the class, or 2) if instance member --> prototype of the class
// name: Method or constructor to which one the parameter is applied to
// position: Ordinal index of the parameter in the function's parameter list
function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter decorator!');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  // setter method := Accessor method
  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price - should be positive!');
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  // Class' method
  @Log3
  getPriceWithTax(@Log4 tax: number) {  // Parameter decorator suh as class' method's argument
    return this._price * (1 + tax);
  }
}

class PrinterWithoutAutoBind {
  message = 'This works!';

  showMessage() {
    console.log(this.message);    // It will return 'undefined', because 'this' is eventlistener's target
  }
}

const printerWithoutAutoBind = new PrinterWithoutAutoBind();
printerWithoutAutoBind.showMessage();

const firstButton = document.querySelector('button')!; // ! Indicate to TS, that we handle possible erros
firstButton.addEventListener('click', printerWithoutAutoBind.showMessage);

// Binding to the proper instance
const secondButton = document.querySelector('button')!;
secondButton.addEventListener('click', printerWithoutAutoBind.showMessage.bind(printerWithoutAutoBind));  // Pure JS

// Any decorator is executed when the class is declared, not when you declare instances
const p1 = new Product('Book', 19);
const p2 = new Product('Book 2', 29);

// Class' method decorator
// We want to set 'this' --> object which owns the method invoked
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;    // .value   It always points to the function invoked
  console.log("Autobind " + originalMethod);
  const adjDescriptor: PropertyDescriptor = {
    // All attributes which can be added to a PropertyDescriptor
    configurable: true,
    enumerable: false,
    // Extra logic each time the user tries to access to this property
    get() {
      const boundFn = originalMethod.bind(this);
      // this   All which is responsible to trigger this get() method === concrete object which it belongs to
      return boundFn;
    }
  };
  return adjDescriptor;
}

class Printer {
  message = 'This works!';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
p.showMessage();

const button = document.querySelector('button')!; // ! Indicate to TS, that we handle possible erros
button.addEventListener('click', p.showMessage);

// ---
// Validation decorators

interface ValidatorConfig {
  [property: string]: { // Array of properties
    [validatableProp: string]: string[]; // ['required', 'positive']    // Each property has got an array of validatableProp. And each validatableProp, with an array of strings
  };
}

const registeredValidators: ValidatorConfig = {};

// Property decorator
function Required(target: any, propName: string) {
  console.log(target.constructor.name);
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['required']  // Just to register this one
  };
}

// Property decorator
function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['positive'] // Just to register this one
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];  // Get access to the stablished validators
  console.log(objValidatorConfig);
  if (!objValidatorConfig) {
    return true;
  }
  // loop   It's based on ValidatorConfig interface created
  let isValid = true;
  for (const prop in objValidatorConfig) {
    console.log(prop);
    for (const validator of objValidatorConfig[prop]) {
      console.log(validator);
      console.log(obj[prop]);
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
  event.preventDefault(); // Don't submit the form, and not send HTTP request
  // Type casting, because we know the type of the elements
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  // Validations could be done here manually

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert('Invalid input, please try again!');
    return;
  }
  console.log(createdCourse);
});
