const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const PORT = 3000;

// TODO: Connect to MongoDB using mongoose.connect()
//       Use the database name 'todo-app' with useNewUrlParser and useUnifiedTopology options
mongoose.connect('mongodb://127.0.0.1:27017/todo-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// TODO: Set up session middleware with a secret key
//       Configure with resave: false and saveUninitialized: true
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));
// TODO: Implement middleware to check if superhero is logged in
//       If not logged in, send status 401 with message 'Superhero access only'
const authenticateUser = (req, res, next) => {
    if (!req.session.user) return res.status(401).json({ message: 'Superhero access only' });
    next();
}
app.use(express.json());  // Use express' built-in JSON parser

// TODO: Simulate a simple superhero database with an object named 'superheroes'
//       Example: const superheroes = { 'superherouser': 'superheropassword' };
const superheroes = { 'superherouser': 'superheropassword' };

// TODO: Create a route for superhero login at POST '/superhero-login'
//       Check if the username and password match the ones in the 'superheroes' object
//       If valid, save the user in the session and return a success message
//       If invalid, return status 401 with a message 'Invalid superhero credentials'
app.post('/superhero-login', (req, res) => {
    const { username, password } = req.body;
    if (superheroes[username] && superheroes[username] === password) {
        req.session.user = username;
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid superhero credentials' });
    }
});
// TODO: Create a protected route at GET '/superhero-protected'
//       Use the authentication middleware you created earlier
//       If authenticated, return a message saying 'This is a superhero protected route'
app.get('/superhero-protected', authenticateUser, (req, res) => {
    res.json({ message: 'This is a superhero protected route' });
})
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
