const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// ✅ Set mongoose strictQuery to true
mongoose.set('strictQuery', true);

// ✅ Define schema and model for Movies
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    director: { type: String, required: true }
});

const Movie = mongoose.model('Movie', movieSchema);

// ✅ Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/movie-database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    console.log('Database Connected.');

    // ✅ Clear existing data and insert dummy records
    await Movie.deleteMany({});
    await Movie.create([
        { title: 'Movie One', director: 'Director One' },
        { title: 'Movie Two', director: 'Director Two' }
    ]);
})
.catch((err) => {
    console.error('Connection error', err);
    process.exit(1);
});

// ✅ Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Get a single movie by ID
app.get('/movies/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found by this ID' });
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json({ message: 'Failed to load Movie', error: err.message });
    }
});

// ✅ Get all movies
app.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ message: 'Failed to load Movies', error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
