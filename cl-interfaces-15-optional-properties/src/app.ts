// interface vs type
// 1) type    === custom types
// type AddFn = (a: number, b: number) => number;
// 2) interface
interface AddFn {
  (a: number, b: number): number;   // anonymous function (===Unnamed)
}

// allows describing the structure
let add: AddFn;

// and then, you indicate the implementation
add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  // modifiers in an interface
  // public name?: string;      // not allowed
  // private name?: string;     // not allowed
  readonly name?: string;       // any object based on this interface, this property just established at the beginning
  outputName?: string;
}


let named: Named;
// Declare the object as commonly
named = {
  name:'Alfredo',
  outputName: 'Alfredo'
};

// Previous behavior could be replaced by custom type, instead of interface
type NamedAsType = {
  readonly name?: string;
  outputName?: string;
}

// extends from another interface
// several interfaces can be extended from
interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;
  age = 30;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + ' ' + this.name);
    } else {
      console.log('Hi!');
    }
  }
}

let user1: Greetable;

user1 = new Person();
// user1.name = 'Manu';

user1.greet('Hi there - I am');
console.log(user1);
