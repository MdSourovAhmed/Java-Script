// Complete the function to properly use stack operations for parenthesis matching
function isValidExpression(expression) {
  const openingParen = { ')': '(', ']': '[', '}': '{' }; // a matching opening parenthesis for every closing one

  let stack = [];
  for (let char of expression) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else if (char === ')' || char === ']' || char === '}') {
      // TODO: Determine if the stack is empty OR the last character does not match the corresponding opening character
      if (stack.length === 0 || stack[stack.length - 1] != openingParen[char])
        return false;

      stack.pop();
    }
    // TODO: What to do if the `char` is not a parenthesis?
    continue;
  }
  // TODO: Check if the stack is empty, indicating that the expression is balanced
  return stack.length === 0;  // Modify this line appropriately
}

// Example usage
let sampleExpression = "([a+b]{c+d})";
console.log(isValidExpression(sampleExpression));  // Expected output: true

let badExpression = "([a+b]{c+d}))";
console.log(isValidExpression(badExpression));  // Expected output: false
