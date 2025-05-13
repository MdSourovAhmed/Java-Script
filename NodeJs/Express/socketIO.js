const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = 3000;
const SOCKET_PORT = 3001;

// TODO: Connect to the MongoDB database 'todo-app'
mongoose.connect('mongodb://127.0.0.1:27017/todo-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB.');
}).catch(() => {
    console.log('Failed to Connect to MongoDB');
});

// TODO: Define a schema (todoSchema) and model for Todo items with fields 'task' and 'userId' (type: mongoose.Schema.Types.ObjectId, ref: 'User')
const todoSchema = new mongoose.Schema({
    task: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Todo = mongoose.model('Todo', todoSchema);
// TODO: Use express.json() middleware to handle JSON payloads
app.use(express.json());
// TODO: Define a POST route `/todos` to add new todo items
app.post('/todos', async (req, res) => {
    try {
        const { task, userId } = req.body;
        const newTodo = new Todo({ task, userId });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add todo' });
    }
});

// TODO: Set up Socket.io to handle a 'connection' event and log "A user connected"
io.on('connection', (socket) => {
    console.log('A user is connected');
    // TODO: Emit a newTask event with task message 'Learn Socket.io'
    socket.emit('newTask', { message: 'Learn Socket.io' });
    // TODO: Also handle a 'disconnect' event and log "User disconnected"
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// TODO: Make the Socket.io server listen on SOCKET_PORT 3001 for WebSocket connections
server.listen(SOCKET_PORT, () => {
    console.log(`Server running (HTTP + Socket.IO) on http://localhost:${SOCKET_PORT}`);
});

// TODO: Make the express app listen on PORT 3000 for HTTP requests
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
