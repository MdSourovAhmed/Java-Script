const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Set mongoose strictQuery to true to suppress deprecation warning
mongoose.set('strictQuery', true);

// TODO: Connect to MongoDB named 'heroes-db' and make sure to set the `useNewUrlParser` and `useUnifiedTopology` options to true
mongoose.connect('mongodb://127.0.0.1:27017/heroes-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("Failed to connect to MongoDB:", error));

// TODO: Add a middleware function that enables the parsing of JSON request bodies
app.use(express.json());

// TODO: Create a route for '/' that sends 'Welcome to the Heroes API!' as the response
app.get('/', (req, res) => {
    res.send('Welcome to the Heroes API!');
});
app.listen(PORT, () => {
    // This will confirm that the server is running
    console.log(`Server running on http://localhost:${PORT}`);
});




