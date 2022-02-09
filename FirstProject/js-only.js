const button = document.querySelector("button");
const input1 = document.getElementById("num1");
const input2 = document.getElementById("num2");


function add(num1, num2) {
  return num1 + num2; // Since each one are strings --> They are concatenated
}

// Workaround function to work properly the adding part
// This workaround isn't cool, since a real "add" function shouldn't do all those validations
function addHandledProperlyInJs(num1, num2) {
  if (typeof num1 === 'number' && typeof num2 === 'number') {
    return num1 + num2;
  } else {
    return +num1 + +num2; //+ Unary operator to convert string to number
  }
}

button.addEventListener("click", function() {
  console.log(add(input1.value, input2.value));
  // In JS, value function always return a String. It doesn't matter the type of input in the html
  // In the html, input1 and input were defined as type number

  // Workaround in JS to work properly the add
  console.log(addHandledProperlyInJs(input1.value, input2.value));
});
