const axios = require('axios');

const serverUrl = 'http://localhost:3000';

// Example 1: Create a new author
axios.post(`${serverUrl}/authors`, {
    name: 'George Orwell'
})
.then(response => {
    console.log('New Author created:', response.data);
    const authorId = response.data._id;

    // Example 2: Add a new Book using the /books route with the created author
    return axios.post(`${serverUrl}/books`, {
        title: '1984',
        author: authorId
    });
})
.then(response => {
    console.log('New Book created:', response.data);

    // Example 3: Retrieve all books with populated author details
    return axios.get(`${serverUrl}/books`);
})
.then(response => {
    console.log('All Books:', response.data);
})
.catch(error => {
    if (error.response) {
        console.error('Error:', error.response.data);
    } else {
        console.error('Unexpected error:', error.message);
    }
});
