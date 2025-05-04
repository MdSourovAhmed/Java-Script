const axios = require('axios');

const serverUrl = 'http://localhost:7000';

// Example 1: Add a new Song
axios.post(`${serverUrl}/songs`, {
    title: 'Bohemian Rhapsody',
    artist: 'Queen'
})
.then(response => {
    console.log('New Song created:', response.data);

    // Example 2: Retrieve all Songs
    return axios.get(`${serverUrl}/songs`);
})
.then(response => {
    console.log('All Songs:', response.data);
})
.catch(error => {
    if (error.response) {
        console.error('Error:', error.response.data.message);
    } else {
        console.error('Unexpected error:', error.message);
    }
});
