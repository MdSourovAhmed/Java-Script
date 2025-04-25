const express = require('express');
const app = express();
const PORT = 3000;

// Sample book data
const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1984', author: 'George Orwell' },
];

// Route to return all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Route to return a single book by ID
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



//--------------------Requesting for data----------------------

/*
const axios = require('axios');

const serverUrl = 'http://localhost:3000';

// Making a GET request to the /books endpoint to get the list of books
axios.get(`${serverUrl}/books`)
  .then(response => {
    console.log('List of books:', response.data);

    // Making a GET request to the /books/:id endpoint to get details of a specific book
    const bookId = 2; // You can replace this with any valid book id
    return axios.get(`${serverUrl}/books/${bookId}`);
  })
  .then(response => {
    console.log('Details of the book:', response.data);
  })
  .catch(error => {
    if (error.response && error.response.status === 404) {
      console.log('Error:', error.response.data);
    } else {
      console.error('Unexpected error:', error.message);
    }
  });
*/
