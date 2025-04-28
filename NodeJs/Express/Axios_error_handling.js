const axios = require('axios');

const serverUrl = 'http://localhost:3000';

// Example 1: Get all users
axios.get(`${serverUrl}/users`)
  .then(response => {
    console.log('All Users:', response.data);

    // Example 2: Get a specific user by ID
    return axios.get(`${serverUrl}/users/2`);
  })
  .then(response => {
    console.log('User with ID 2:', response.data);

    // Example 3: Filter users by name
    return axios.get(`${serverUrl}/users?name=John`);
  })
  .then(response => {
    console.log('Users filtered by name "John":', response.data);

    // Example 4: Get orders for a specific user by ID
    return axios.get(`${serverUrl}/users/1/orders`);
  })
  .then(response => {
    console.log('Orders for User with ID 1:', response.data);

    // Example 5: Trigger a 404 error by requesting a non-existent user
    return axios.get(`${serverUrl}/users/999`);
  })
  .then(response => {
    console.log('This should not be logged');
  })
  .catch(error => {
    if (error.response && error.response.status === 404) {
      console.log('404 Error for non-existent user:', error.response.data);
    } else {
      console.error('Unexpected error:', error.message);
    }
  });

// Example 6: Trigger a 404 error by requesting orders for a non-existent user
axios.get(`${serverUrl}/users/999/orders`)
  .then(response => {
    console.log('This should not be logged');
  })
  .catch(error => {
    if (error.response && error.response.status === 404) {
      console.log('404 Error for non-existent orders:', error.response.data);
    } else {
      console.error('Unexpected error:', error.message);
    }
  });

// Example 7: Trigger a 500 error by causing a server error (if any server-side error handling route exists)
// Note: For this example to work, you would need a route that deliberately triggers a server error.
// axios.get(`${serverUrl}/cause-error`)
//   .then(response => {
//     console.log('This should not be logged');
//   })
//   .catch(error => {
//     if (error.response && error.response.status === 500) {
//       console.log('500 Error:', error.response.data);
//     } else {
//       console.error('Unexpected error:', error.message);
//     }
//   });
