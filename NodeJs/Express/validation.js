const express = require('express');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const { type } = require('express/lib/response');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/recipe-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define the Recipe schema and model with fields: title (String, required), ingredients (array of Strings, required), userId (ObjectId, required)
const recipeSchema = new mongoose.Schema({
    // TODO: Implement the title field with the required validation
    title: { type: String, required: true },
    // TODO: Implement the ingredients field with the required validation
    ingredients: { type: [String], required: true },
    // type: mongoose.Schema.Types.ObjectId, ref: 'User' allows referencing the User collection
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// Middleware to check if user is logged in
const authenticateUser = (req, res, next) => {
    const isLoggedIn = true;
    req.user = { userId: '630fea71e4b0b7a97be8acc5' };
    if (!isLoggedIn) return res.status(401).json({ message: 'Access denied' });

    next();
};

app.use(express.json());

// Create a POST route '/add-recipe'
app.post('/add-recipe', [
    // TODO: Validate that title is not empty with a custom message 'Title is required'
    check('title').notEmpty().withMessage('Title is required'),
    // TODO: Validate that ingredients is an array using isArray() with at least one item and a custom message 'Ingredients must be an array with at least one item'
    // isArray() checks if the field is an array and optionally enforces criteria like min length
    check('ingredients').isArray({ min: 1 }).withMessage('Ingredients must be an array with at least one item')
], authenticateUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // TODO: Create a new Recipe object with title, ingredients, and userId
    const { title, ingredients, userId } = req.body;
    const newRecipe = new Recipe({
        // TODO: Assign values from the request body
        title, ingredients, userId
    });

    try {
        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add recipe' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
