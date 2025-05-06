const axios = require('axios');

const serverUrl = 'http://localhost:3000';

async function run() {
    console.log('Connecting to the server...');

    try {
        // Adding a delay to ensure the server has started
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Fetch all gadgets to print them
        const allGadgetsResponse = await axios.get(`${serverUrl}/gadgets`);
        console.log('All Gadgets:', allGadgetsResponse.data);

        // Retrieve ID of the second gadget (assuming index 1)
        const secondGadgetId = allGadgetsResponse.data[1]._id;

        // Delete a Gadget by ID
        const deleteResponse = await axios.delete(`${serverUrl}/gadgets/${secondGadgetId}`);
        console.log(deleteResponse.data);

        // Final fetch to observe the deletion
        const finalGadgetsResponse = await axios.get(`${serverUrl}/gadgets`);
        console.log('All Gadgets after deletion:', finalGadgetsResponse.data);
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.data.message);
        } else {
            console.error('Unexpected error:', error.message);
        }
    }
}

run();
