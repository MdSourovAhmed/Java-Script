
// TODO: Define a function named evaluateReversePolishNotation that accepts an expression as a parameter
function evaluateReversePolishNotation(expression) {
  // TODO: Initialize an empty array to act as the stack
  let stack = [];
  // TODO: Split the expression into tokens and iterate over them
  const tockens = expression.split(" ");
  for (let op of tockens) {
    // TODO: If the token is an operator ('+', '-'), pop the top two elements from the stack for operation
    if (["+", "-"].includes(op)) {
      // TODO: Based on the operator, perform the appropriate operation and push the result back onto the stack
      let first = stack.pop();
      let second = stack.pop();
      let res = 0;
      if (op === "+") res = first + second;
      else res = second - first;
      stack.push(res);
    } else {
      // TODO: Otherwise, treat the token as an operand and push it onto the stack
      stack.push(parseInt(op, 10));
    }
  }

  // TODO: Return the top element of the stack as the result of the expression evaluation
  return stack.pop();
}

// Example usage
expression = "1 2 + 4 -";
console.log(evaluateReversePolishNotation(expression)); // Expected output: -1
