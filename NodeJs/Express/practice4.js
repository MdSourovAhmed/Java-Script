const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Set mongoose strictQuery to true to suppress deprecation warning
mongoose.set('strictQuery', true);

// Define a schema and model for Movie items
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    released: { type: Boolean, required: true } 
});

const Movie = mongoose.model('Movie', movieSchema);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/movies-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('Connected to MongoDB');

    // Clear existing data
    await Movie.deleteMany({});

    // Insert dummy movies
    await Movie.create([
        { title: 'Inception', genre: 'Sci-Fi', released: true },
        { title: 'Avengers: Endgame', genre: 'Action', released: true },
        { title: 'The Batman', genre: 'Action', released: false }
    ]);
}).catch((error) => {
    console.error('Connection error', error);
    process.exit(1);
});

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Create a route to handle GET requests for all movies
    // Fetch all movies from the database
    // Send the retrieved movies in the JSON response
    // Handle any potential errors by responding with a 500 status and an error message
app.get('/movies',async(req,res)=>{
   try{
    const Movies=await Movie.find({});
    res.json(Movies);
   }catch(err){
    console.error(err.stack);
    res.status(500).json({ message: 'Failed to load Movies'});
   }
});
// TODO: Create a route to handle GET requests for all released movies
    // Fetch only the released movies from the database
    // Send the retrieved released movies in the JSON response
    // Handle any potential errors by responding with a 500 status and an error message
app.get('/movies/released',async(req,res)=>{
   try{
    const releasedMovies=await Movie.find({released:true});
    res.json(releasedMovies);
   }catch(err){
    console.error(err.stack);
    res.status(500).json({ message: 'No such Movie found.'});
   }
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
