const axios = require('axios');

const serverUrl = 'http://localhost:3000';

// Helper function to handle errors
const handleError = (error, action) => {
    if (error.response) {
        console.error(`Error during ${action}:`, error.response.data.error || error.response.data.message);
    } else {
        console.error(`Unexpected error during ${action}:`, error.message);
    }
};

// Example 1: Create a new Todo item using the /todos route
axios.post(`${serverUrl}/todos`, {
    task: 'Complete the run.js script',
    status: 'pending'
})
.then(response => {
    console.log('New Todo created:', response.data);

    // Get the created Todo item's ID
    const todoId = response.data._id;

    // Example 2: Fetch all Todo items using the /todos route
    axios.get(`${serverUrl}/todos`)
    .then(response => {
        console.log('Fetched Todos:', response.data);

        // Example 3: Update the created Todo item using the /todos/:id route
        axios.put(`${serverUrl}/todos/${todoId}`, {
            task: 'Update the run.js script',
            status: 'completed'
        })
        .then(response => {
            console.log('Todo updated:', response.data);

            // Example 4: Delete the updated Todo item using the /todos/:id route
            axios.delete(`${serverUrl}/todos/${todoId}`)
            .then(response => {
                console.log('Todo deleted successfully:', response.data);
            })
            .catch(error => handleError(error, 'deleting Todo'));
        })
        .catch(error => handleError(error, 'updating Todo'));
    })
    .catch(error => handleError(error, 'fetching Todos'));
})
.catch(error => handleError(error, 'creating Todo'));
