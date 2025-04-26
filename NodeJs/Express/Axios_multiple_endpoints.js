const axios = require('axios');

const serverUrl = 'http://localhost:3000';

// Example 1: Create a new team
axios.post(`${serverUrl}/teams`, {
    name: 'Nets',
    city: 'Brooklyn'
})
.then(response => {
    console.log('New team created:', response.data);

    // Example 2: Create a new player associated with the new team
    return axios.post(`${serverUrl}/players`, {
        name: 'Kevin Durant',
        teamId: response.data.id
    });
})
.then(response => {
    console.log('New player created:', response.data);

    // Example 3: Retrieve the newly created team with associated players
    return axios.get(`${serverUrl}/teams/${response.data.teamId}`);
})
.then(response => {
    console.log('Retrieved team with players:', response.data);

    // Example 4: Retrieve all players with associated team information
    return axios.get(`${serverUrl}/players`);
})
.then(response => {
    console.log('All players with team info:', response.data);
})
.catch(error => {
    if (error.response) {
        console.log('Error:', error.response.data.message || error.response.data);
    } else {
        console.error('Unexpected error:', error.message);
    }
});

// // Example 5: Attempt to create a player with missing information to trigger a 400 error
// axios.post(`${serverUrl}/players`, {
//     name: 'Incomplete Player'
//     // Missing teamId field
// })
// .then(response => {
//     console.log('This should not be logged');
// })
// .catch(error => {
//     if (error.response && error.response.status === 400) {
//         console.log('Error for missing fields:', error.response.data.message);
//     } else {
//         console.error('Unexpected error:', error.message);
//     }
// });

// // Example 6: Attempt to retrieve a non-existent team to trigger a 404 error
// axios.get(`${serverUrl}/teams/999`)
// .then(response => {
//     console.log('This should not be logged');
// })
// .catch(error => {
//     if (error.response && error.response.status === 404) {
//         console.log('404 Error:', error.response.data);
//     } else {
//         console.error('Unexpected error:', error.message);
//     }
// });
