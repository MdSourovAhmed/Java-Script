const axios = require('axios');

const serverUrl = 'http://localhost:3000';

async function run() {
    console.log('Connecting to the server...');

    try {
        // Adding a delay to ensure the server has started
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Fetch all movies to print them
        const allMoviesResponse = await axios.get(`${serverUrl}/movies`);
        console.log('All Movies:', allMoviesResponse.data);

        // Fetch all released movies to print them
        const releasedMoviesResponse = await axios.get(`${serverUrl}/movies/released`);
        console.log('Released Movies:', releasedMoviesResponse.data);
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.data.message);
        } else {
            console.error('Unexpected error:', error.message);
        }
    }
}

run();
