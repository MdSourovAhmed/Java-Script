class CafeteriaStack {
    constructor() {
        this.stack = [];
    }

    addTray(trayId) {
        this.stack.push(trayId);
    }

    removeTray() {
        if (this.stack.length === 0) {
            return "No more trays!";
        }
        return this.stack.pop();
    }
}

// Sample usage
const cafeteria = new CafeteriaStack();
cafeteria.addTray("Tray_4");
console.log(cafeteria.removeTray());  // Output: Tray_4
console.log(cafeteria.removeTray());  // Output: No more trays!
