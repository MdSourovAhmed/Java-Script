const axios = require('axios');

const serverUrl = 'http://localhost:3000';

// Adds a delay to ensure the server has started before making requests
async function run() {
    console.log('Connecting to the server...');

    try {
        // Adding a delay to ensure the server has started
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Fetch all movies to print them
        const allMoviesResponse = await axios.get(`${serverUrl}/movies`);
        console.log('All Movies:', allMoviesResponse.data);

        // Retrieve a Movie by the ID of the second movie (assuming index 1)
        const secondMovieId = allMoviesResponse.data[1]._id;
        const response = await axios.get(`${serverUrl}/movies/${secondMovieId}`);
        console.log('Retrieved Movie by ID:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.data.message);
        } else {
            console.error('Unexpected error:', error.message);
        }
    }
}

run();
