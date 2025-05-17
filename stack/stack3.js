class CafeteriaStack {
    constructor() {
        this.trayStack = [];  // Stack to hold trays
    }

    addTray(trayId) {
        // Add a new tray to the stack (LIFO)
        this.trayStack.push(trayId);
    }

    removeTray() {
        // Remove and return the top tray (LIFO) if stack isn't empty
        if (this.trayStack.length > 0) {
            return this.trayStack.pop();
        }
        return null;  // If stack is empty, return null
    }
}

// Simulating cafeteria tray management
const cafeteria = new CafeteriaStack();
cafeteria.addTray(101);
cafeteria.addTray(102);
cafeteria.addTray(103);

console.log(cafeteria.removeTray());  // Should print 103
