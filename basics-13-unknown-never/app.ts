let userInput: unknown;
let userName: string;
let anyUserInput: any;

// it can be redeclared the value without getting errors
userInput = 5;
userInput = 'Max';
// userInput = userName;    // unknown -- can be      --> string
// userName = userInput     // string  -- can NOT be  --> unknown
if (typeof userInput === 'string') {
  userName = userInput;
}
// Comparing with any
anyUserInput = userName;    // unknown -- can be      --> string
userName = anyUserInput;    // string  -- can be      --> any
// it's more restrictive that any, that's why you need to filter the type

// function to return nothing
// 1) without specifying the type --> void is inferred
// function generateError(message: string, code: number) {
// 2) specifying void
// function generateErrorVoid(message: string, code: number): void {
// 3) specifying never
function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}
const resultNever = generateError('An error occurred!', 500);
console.log("generateError - never " + resultNever);