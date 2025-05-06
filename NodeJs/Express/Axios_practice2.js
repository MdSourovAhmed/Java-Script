const axios = require('axios');

const serverUrl = 'http://localhost:3000';

async function run() {
    console.log('Connecting to the server...');

    try {
        // Adding a delay to ensure the server has started
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Fetch all todos to print them
        const allTodosResponse = await axios.get(`${serverUrl}/todos`);
        console.log('All Todos:', allTodosResponse.data);

        // Retrieve ID of the second todo (assuming index 1)
        const secondTodoId = allTodosResponse.data[1]._id;

        // Update a Todo by ID
        const updatedResponse = await axios.put(`${serverUrl}/todos/${secondTodoId}`, {
            task: 'Updated Task Two',
            completed: false
        });
        console.log('Updated Todo by ID:', updatedResponse.data);

        // Final fetch to observe the update
        const finalTodosResponse = await axios.get(`${serverUrl}/todos`);
        console.log('All Todos after update:', finalTodosResponse.data);
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.data.message);
        } else {
            console.error('Unexpected error:', error.message);
        }
    }
}

run();
