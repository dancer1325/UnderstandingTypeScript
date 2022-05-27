function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  // Since both are number --> It evaluates the expression
  console.log(n1 + n2);

  const result = n1 + n2;
  if (showResult) {
    console.log(phrase + n1 + n2);   // Since phrase is a string --> it doesn't evaluate the expression, just concatenate them
    console.log(phrase + result);
  } else {
    return result;
  }
}

// There is just 1! number type. By default all are float
const number1 = 5; // No difference if you type 5.0
const number2 = 2.8;
const printResult = true;
const resultPhrase = 'Result is: ';

add(number1, number2, printResult, resultPhrase);
