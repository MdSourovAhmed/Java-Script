function minRemovalsToBalance(brackets) {
    let stack = []; // Initialize an empty array to act as the stack
    let removals = 0; // Counter for removals needed
    
    // Iterate through each bracket in the input string
    for (let char of brackets) {
        if (char === '(') {
            // Push opening bracket to stack
            stack.push(char);
        } else if (char === ')') {
            if (stack.length > 0) {
                // Pop matching opening bracket
                stack.pop();
            } else {
                // No matching opening bracket - this closing bracket must be removed
                removals++;
            }
        }
    }
    
    // Any remaining opening brackets in stack need to be removed
    removals += stack.length;
    
    return removals;
}

// Example usage
let invalidParentheses = "()))(()";
let removalsNeeded = minRemovalsToBalance(invalidParentheses);
console.log(removalsNeeded);  // Expected output: 3
