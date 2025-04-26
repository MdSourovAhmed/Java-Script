
//--------------------Requesting for data----------------------

const axios = require('axios');

const serverUrl = 'http://localhost:3000';

// Making a GET request to the /books endpoint to get the list of books
axios.get(`${serverUrl}/books`)
  .then(response => {
    console.log('List of books:', response.data);

    // Making a GET request to the /books/:id endpoint to get details of a specific book
    const bookId = 2; // You can replace this with any valid book id
    return axios.get(`${serverUrl}/books/${bookId}`);
  })
  .then(response => {
    console.log('Details of the book:', response.data);
  })
  .catch(error => {
    if (error.response && error.response.status === 404) {
      console.log('Error:', error.response.data);
    } else {
      console.error('Unexpected error:', error.message);
    }
  });

