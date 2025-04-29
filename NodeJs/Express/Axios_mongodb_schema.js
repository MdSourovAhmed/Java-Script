const axios = require('axios');

const serverUrl = 'http://localhost:3000';

// Example 1: Add a new superhero using the /heroes route
axios.post(`${serverUrl}/heroes`, {
    alias: 'Spider-Man',
    superpower: 'Web-slinging'
})
.then(response => {
    console.log('New Hero created:', response.data);

    // Example 2: Retrieve all superheroes after adding the first one
    return axios.get(`${serverUrl}/heroes`);
})
.then(response => {
    console.log('All Heroes after first creation:', response.data);

    // Example 3: Add another superhero
    return axios.post(`${serverUrl}/heroes`, {
        alias: 'Iron Man',
        superpower: 'Advanced suit technology'
    });
})
.then(response => {
    console.log('Another Hero created:', response.data);

    // Example 4: Retrieve all superheroes again to see the updated list
    return axios.get(`${serverUrl}/heroes`);
})
.then(response => {
    console.log('Updated list of Heroes:', response.data);
})
.catch(error => {
    if (error.response) {
        console.error('Error:', error.response.data.error);
    } else {
        console.error('Unexpected error:', error.message);
    }
});
