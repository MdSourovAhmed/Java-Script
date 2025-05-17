// Define a function to check for the next available tray without removing it
function nextTray(stack) {
    // Return the top-most tray without removing it from the stack
    if (stack.length === 0) {
        return "No trays available.";
    }
    return stack[stack.length - 1];
}

// Initialize the stack with tray IDs
let trayStack = [1001, 1002, 1003];

// Use the `nextTray` function to check and print which tray will be served next
console.log("Next tray to serve:", nextTray(trayStack));  // Output: 1003

// Simulate removing a tray from the stack
trayStack.pop();

// Use the `nextTray` function to check and print the next tray after one is removed
console.log("Next tray to serve:", nextTray(trayStack));  // Output: 1002
