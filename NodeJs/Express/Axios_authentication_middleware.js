const axios = require('axios');

const baseUrl = 'http://localhost:3000';

async function superheroLogin() {
    try {
        const response = await axios.post(`${baseUrl}/superhero-login`, {
            username: 'superherouser',
            password: 'superheropassword'
        });
        console.log('Superhero login:', response.data);
        return response.headers['set-cookie']; // Returning the session cookie
    } catch (error) {
        console.error('Superhero login failed:', error.response ? error.response.data : error.message);
    }
}

async function accessProtectedRoute(cookie) {
    try {
        const response = await axios.get(`${baseUrl}/superhero-protected`, {
            headers: { Cookie: cookie }
        });
        console.log('Accessing protected route:', response.data);
    } catch (error) {
        console.error('Access to protected route failed:', error.response ? error.response.data : error.message);
    }
}

async function runTests() {
    const cookie = await superheroLogin();
    if (cookie) {
        await accessProtectedRoute(cookie);
    }
}

runTests();
