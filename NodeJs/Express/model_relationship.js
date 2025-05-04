const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// Set mongoose strictQuery
mongoose.set('strictQuery', true);

// TODO: Connect to MongoDB at 127.0.0.1:27017/library-app
mongoose.connect('mongodb://127.0.0.1:27017/library-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => { console.log("Connected to MongoDB"); })
    .catch(() => { console.error("Failed to connect to MongoDB."); });
// TODO: Define schema for authors
// Structure: name (String, required)

const authorschema = mongoose.Schema({
    name: { type: String, required: true }
})
// TODO: Define schema for books with a reference to authors
// Structure: title (String, required), author (ObjectId, ref to Author)
const bookschema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }
});
// TODO: Create models for Author and Book
const Author =new mongoose.model('Author', authorschema);
const Book =new mongoose.model('Book', bookschema);

// TODO: Create GET /authors and POST /authors routes
// For POST /authors, the request body should contain a "name" field, e.g., { name: "Author Name" }
app.get('/authors', async (req, res) => {
    const authors = await Author.find();
    res.send(authors);
});

app.post('/authors', async (req, res) => {
    const author = new Author(req.body);
    await author.save();
    res.send(author);
})


// TODO: Create GET /books and POST /books routes
// For POST /books, the request body should contain "title" and "author" fields, e.g., { title: "Book Title", author: "Author ObjectId" }
app.get('/books', async (req, res) => {
    const books = await Book.find().populate('author');
    res.send(books);
});

app.post('/books', async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.send(book);
})


// TODO: Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Sonething Broke!');
    next();
});

// TODO: Start Express server on port 3000
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
