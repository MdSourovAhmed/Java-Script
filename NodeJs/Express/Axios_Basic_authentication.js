
//---------------- Axios code------------------

const axios = require('axios');

const serverUrl = 'http://localhost:3000';

// Function to create the Basic Auth header
const createAuthHeader = (username, password) => {
    const credentials = Buffer.from(`${username}:${password}`).toString('base64');
    return `Basic ${credentials}`;
};

// Example 1: Authenticating as Scott Lang (Ant-Man)
axios.get(`${serverUrl}/dashboard`, {
    headers: {
        Authorization: createAuthHeader('antman', 'quantum'),
    }
})
.then(response => {
    console.log('Response for Scott Lang:', response.data);
})
.catch(error => {
    console.error('Error for Scott Lang:', error.response ? error.response.data : error.message);
});

// Example 2: Authenticating as Hope Van Dyne (Wasp)
axios.get(`${serverUrl}/dashboard`, {
    headers: {
        Authorization: createAuthHeader('wasp', 'sting'),
    }
})
.then(response => {
    console.log('Response for Hope Van Dyne:', response.data);
})
.catch(error => {
    console.error('Error for Hope Van Dyne:', error.response ? error.response.data : error.message);
});

// Example 3: Authenticating as Hank Pym (Original Ant-Man)
axios.get(`${serverUrl}/dashboard`, {
    headers: {
        Authorization: createAuthHeader('originalantman', 'pymparticles'),
    }
})
.then(response => {
    console.log('Response for Hank Pym:', response.data);
})
.catch(error => {
    console.error('Error for Hank Pym:', error.response ? error.response.data : error.message);
});

// Example 4: Authenticating with incorrect credentials
axios.get(`${serverUrl}/dashboard`, {
    headers: {
        Authorization: createAuthHeader('antman', 'wrongpassword'),
    }
})
.then(response => {
    console.log('Response for Scott Lang with wrong password:', response.data);
})
.catch(error => {
    console.error('Error for Scott Lang with wrong password:', error.response ? error.response.data : error.message);
});

