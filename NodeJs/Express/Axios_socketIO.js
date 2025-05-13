const axios = require('axios');
const io = require('socket.io-client');

const socketUrl = 'http://localhost:3001';
const apiUrl = 'http://localhost:3000';

const socket = io(socketUrl);

// Listening for the 'newTask' event from the server
socket.on('newTask', (data) => {
    console.log('Received new task message:', data);
});

socket.on('connect', () => {
    console.log('Connected to Socket.io server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from Socket.io server');
});

async function addTodo() {
    try {
        const response = await axios.post(`${apiUrl}/todos`, {
            task: 'Complete the project',
            userId: '630fea71e4b0b7a97be8acc5'  // Example ObjectId, replace with actual userId
        });
        console.log('Todo added:', response.data);
    } catch (error) {
        console.error('Error adding todo:', error.response ? error.response.data : error.message);
    }
}

async function runTests() {
    console.log('Starting tests...');
    await addTodo();
    
    // Wait for a short time to ensure the event is received
    setTimeout(() => {
        socket.close();  // Close the socket connection after tests
        console.log('Tests completed');
    }, 3000);
}

runTests();
