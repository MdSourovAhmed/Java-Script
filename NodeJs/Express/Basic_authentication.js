const express = require('express');

const app = express();
const PORT = 3000;

const users = [
    { id: 1, name: 'Scott Lang', username: 'antman', password: 'quantum' },
    { id: 2, name: 'Hope Van Dyne', username: 'wasp', password: 'sting' },
    { id: 3, name: 'Hank Pym', username: 'originalantman', password: 'pymparticles' },
];

// TODO: Basic authentication middleware to protect the /dashboard route
app.use((req,res,next)=>{
    const autHeader=req.headers.authorization;
    if(!autHeader)res.status(401).send('Unauthorized.');
    
     const credentials = Buffer.from(autHeader.split(' ')[1], 'base64').toString().split(':');
    const username = credentials[0];
    const password = credentials[1];

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).send('Unauthorized');
    }

    req.user = user;
    next();
});

app.get('/dashboard',(req,res)=>{
    res.send(req.user.name);
})


app.listen(PORT,()=>{
    console.log(`Server is on at port: ${PORT}`);
})
    // TODO: Check if the Authorization header is present

        // TODO: Return 401 Unauthorized if header is missing

    // TODO: Decode credentials and validate them

    // TODO: Find user matching the provided username and password

        // TODO: Return 401 Unauthorized if credentials are invalid

    // TODO: Attach user information to the request object

    // TODO: Proceed to the next middleware or route handler


// TODO: Create a /dashboard route that returns a welcome message, including the user's name

// TODO: Start the server and log a message indicating the URL it is running on


/*//---------------- Axios code------------------

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

*/
