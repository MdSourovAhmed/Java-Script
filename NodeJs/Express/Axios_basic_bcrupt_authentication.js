const axios = require('axios');

const baseUrl = 'http://localhost:3000';

// Function to register a new user
async function registerUser() {
    try {
        const response = await axios.post(`${baseUrl}/register`, {
            username: 'chefmaster',
            password: 'secretpassword'
        });
        console.log('User registered:', response.data);
    } catch (error) {
        console.error('Error registering user:', error.response ? error.response.data : error.message);
    }
}

// Function to log in with the registered user
async function loginUser() {
    try {
        const response = await axios.post(`${baseUrl}/login`, {
            username: 'chefmaster',
            password: 'secretpassword'
        });
        console.log('Login successful:', response.data);
    } catch (error) {
        console.error('Error logging in:', error.response ? error.response.data : error.message);
    }
}

// Function to attempt login with invalid credentials
async function loginWithInvalidCredentials() {
    try {
        const response = await axios.post(`${baseUrl}/login`, {
            username: 'chefmaster',
            password: 'wrongpassword'
        });
        console.log('Login should have failed, but succeeded:', response.data);
    } catch (error) {
        console.error('Expected login failure:', error.response ? error.response.data : error.message);
    }
}

// Run the test cases
(async () => {
    await registerUser();
    await loginUser();
    await loginWithInvalidCredentials();
})();
