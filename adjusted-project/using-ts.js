var button = document.querySelector("button");
var input1WithoutIndicatingHTMLInputElement = document.getElementById("num1");
var input2WithoutIndicatingHTMLInputElement = document.getElementById("num2");
// If we are sure that the element won't be never null === We always find an element --> !
// as TypeToCast is type casting
var input1 = document.getElementById("num1");
var input2 = document.getElementById("num2");
function add(num1, num2) {
    return num1 + num2;
}
function addFunctioVanillaJS(num1, num2) {
    return num1 + num2;
}
button.addEventListener("click", function () {
    // +  String --> number
    console.log(add(+input1.value, +input2.value));
    // TypeScript in code time throws an error, because most of the HTML elements don't have a value property
    // console.log(addFunctioVanillaJS(+input1WithoutIndicatingHTMLInputElement.value, +input2WithoutIndicatingHTMLInputElement.value));
});
