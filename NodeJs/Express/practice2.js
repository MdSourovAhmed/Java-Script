const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Set mongoose strictQuery to true to suppress the deprecation warning
mongoose.set('strictQuery', true);

// TODO: Connect to MongoDB using mongoose.connect and handle the connection success and error
mongoose.connect('mongodb://127.0.0.1:27017/todo-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Connection error', err);
    process.exit(1);
});
// TODO: Define a schema for ToDo items with fields:
// - task: type String, required true
// - completed: type Boolean, required true
const todoSchema = new mongoose.Schema({
    task: { type: String, required: true },
    completed: { type: Boolean, required: true }
});
// TODO: Create a model for ToDo items using the schema
const Todo = mongoose.model('Todo', todoSchema);
// TODO: Add middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// TODO: Create a GET route to list all to-do items
app.get('/todos', async (req, res) => {
    try {
        const Todos = await Todo.find({});
        res.json(Todos);
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ message: 'Could not find any Todos.' })
    }
});
// TODO: Create a PUT route to update a to-do item by its ID
// - Use req.params to get the to-do ID
// - Use req.body to get the updated task and completed status
// - Use Todo.findByIdAndUpdate to update the item and return the new item
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { task, completed } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(id, { task, completed }, { new: true });
        if (!updatedTodo) return res.status(400).json({ message: 'Could not find any Todo by this id.' });
        res.json(updatedTodo);
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ message: 'Could not update the Todo.' })
    }
});
// TODO: Start the server on the specified port and log the server URL
app.listen(PORT, () => {
    console.log(`Server is running on http://locathost:${PORT}`);
});
