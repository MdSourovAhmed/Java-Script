const axios = require('axios');

const baseUrl = 'http://localhost:3000';

async function addRecipe() {
    try {
        const response = await axios.post(`${baseUrl}/add-recipe`, {
            title: 'Chocolate Cake',
            ingredients: ['Flour', 'Sugar', 'Cocoa powder', 'Eggs', 'Butter']
        });
        console.log('Recipe added:', response.data);
    } catch (error) {
        if (error.response && error.response.data.errors) {
            console.error('Validation errors:', error.response.data.errors);
        } else {
            console.error('Failed to add recipe:', error.response ? error.response.data : error.message);
        }
    }
}

async function addInvalidRecipe() {
    try {
        const response = await axios.post(`${baseUrl}/add-recipe`, {
            title: '',
            ingredients: [] // Invalid as the array is empty
        });
        console.log('Recipe added:', response.data);
    } catch (error) {
        if (error.response && error.response.data.errors) {
            console.error('Validation errors:', error.response.data.errors);
        } else {
            console.error('Failed to add recipe:', error.response ? error.response.data : error.message);
        }
    }
}

async function runTests() {
    await addRecipe();
    await addInvalidRecipe();
}

runTests();
