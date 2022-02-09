const button = document.querySelector("button");
const input1WithoutIndicatingHTMLInputElement = document.getElementById("num1");
const input2WithoutIndicatingHTMLInputElement = document.getElementById("num2");
// If we are sure that the element won't be never null === We always find an element --> !
// as TypeToCast is type casting
const input1 = document.getElementById("num1")! as HTMLInputElement;
const input2 = document.getElementById("num2")! as HTMLInputElement;

function add(num1: number, num2: number) {
  return num1 + num2;
}

function addFunctioVanillaJS(num1, num2) {
  return num1 + num2;
}

button.addEventListener("click", function() {
  // +  String --> number
  console.log(add(+input1.value, +input2.value));

  // TypeScript in code time throws an error, because most of the HTML elements don't have a value property
  // console.log(addFunctioVanillaJS(+input1WithoutIndicatingHTMLInputElement.value, +input2WithoutIndicatingHTMLInputElement.value));
});
