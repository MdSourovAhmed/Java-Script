const axios = require('axios');

const serverUrl = 'http://localhost:3000';

// Making a GET request to the /celebrities endpoint without any query parameters
axios.get(`${serverUrl}/celebrities`)
  .then(response => {
    console.log('All celebrities:', response.data);

    // Making a GET request to the /celebrities endpoint with a fullName query parameter
    return axios.get(`${serverUrl}/celebrities?fullName=Chris`);
  })
  .then(response => {
    console.log('Celebrities filtered by name (Chris):', response.data);

    // Making a GET request to the /celebrities endpoint with another fullName query parameter
    return axios.get(`${serverUrl}/celebrities?fullName=Scarlett Johansson`);
  })
  .then(response => {
    console.log('Celebrities filtered by name (Scarlett Johansson):', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });