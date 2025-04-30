const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todoApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB', err));

// ToDo Schema and Model
const todoSchema = new mongoose.Schema({
    task: { type: String, required: true },  // task is a required string
    status: { type: String, default: 'pending' } // status with a default value
});

const Todo = mongoose.model('Todo', todoSchema); // Creating Todo model using the schema

// TODO: Create a POST route at '/todos' to create new ToDo items
// The request body should contain "task" and optionally "status" fields, e.g., { task: "Complete project", status: "pending" }
app.post('/todos', async (req, res) => {
    const { task, status } = req.body;
    const newTodo = new Todo({ task, status });
    try {
        const saveTodo = await newTodo.save();
        res.status(201).send(saveTodo);
    } catch (err) {
        res.status(400).send({ error: 'Error creating Todo: ' + err.message });
    }
})

// TODO: Create a GET route at '/todos' to fetch all ToDo items
// This route should retrieve and return all ToDo items from the database
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).send(todos);
    } catch (err) {
        res.status(400).send({ error: 'Error fetching Todos: ' + err.message });
    }
});

// TODO: Create a PUT route at '/todos/:id' to update a ToDo item by ID
// The request body should contain "task" and optionally "status" fields for updating, e.g., { task: "Update project", status: "completed" }
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { task, status } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(id, { task, status }, { new: true, runValidators: true });
        if (!updatedTodo) {
            return res.status(404).send({ message: 'Todo not found' });
        }
        res.status(200).send(updatedTodo);
    } catch (err) {
        res.status(400).send({ error: 'Error Updating Todo: ' + err.message });
    }
});

// TODO: Create a DELETE route at '/todos/:id' to delete a ToDo item by ID
// This route should delete a ToDo item specified by its ID from the database
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).send({ message: 'Todo not found' });
        }
        res.status(200).send({ message: 'Todo Deleted successfully.' });
    } catch (err) {
        res.status(400).send({ error: 'Error Deleting Todo: ' + err.message });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
