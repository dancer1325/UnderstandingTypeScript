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
  return function<T extends { new (...args: any[]): { name: string } }>(
      originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
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

function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator!');
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

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

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const p1 = new Product('Book', 19);
const p2 = new Product('Book 2', 29);

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
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

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);

// ---

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['required']
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['positive']
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
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
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert('Invalid input, please try again!');
    return;
  }
  console.log(createdCourse);
});
