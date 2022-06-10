let appId = 'abc';
const button = document.querySelector('button')!;

function add(n1: number, n2: number) {
  if (n1 + n2 > 0) {
    return n1 + n2;
  }
  return;    // "noImplicitReturns": true   It's possible to return something in certain conditions --> Force to return always
}

// function clickHandler(message: string, age:number) {   //"noUnusedParameters": true,    TS will report an error here
function clickHandler(message: string) {
  // let userName = 'Max';        // "noUnusedLocals": true,    TS will report an error here
  console.log('Clicked! ' + message);
}
// a comment
if (button) {
  button.addEventListener('click', clickHandler.bind(null, "You're welcome!"));
}
