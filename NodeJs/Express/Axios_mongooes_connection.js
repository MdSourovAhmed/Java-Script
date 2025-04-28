const axios = require('axios');

const serverUrl = 'http://localhost:3000';

// Example 1: Test the root endpoint
axios.get(`${serverUrl}/`)
  .then(response => {
    console.log('Root endpoint response:', response.data);
  })
  .catch(error => {
    console.error('Error accessing the root endpoint:', error.message);
  });

// Example 2: Confirm MongoDB connection by accessing the root
axios.get(`${serverUrl}/`)
  .then(response => {
    console.log('MongoDB connection confirmed by accessing root:', response.data);
  })
  .catch(error => {
    console.error('Error confirming MongoDB connection:', error.message);
  });
