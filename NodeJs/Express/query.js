// TODO: Require the 'express' module
const express=require('express');
// TODO: Initialize an Express application
const app=express();
// TODO: Set the port number to 3000
const PORT=3000;
const celebrityData = [
    { id: 1, fullName: 'Robert Downey Jr.' },
    { id: 2, fullName: 'Scarlett Johansson' },
    { id: 3, fullName: 'Chris Hemsworth' },
];

// TODO: Create a GET route for '/celebrities'
app.get('/celebrities', (req,res)=>{
    // Filter logic
    // TODO: Retrieve the 'fullName' query parameter from the request
    const {fullName}=req.query;
    // TODO: If 'fullName' is provided, filter the celebrityData array where the fullName includes the query value
    const celebritydata=fullName?celebrityData.filter(celeb=>celeb.fullName.includes(fullName)):celebrityData;
    // TODO: If 'fullName' is not provided, return the entire celebrityData array
    
    // TODO: Return the filtered array as JSON in the response
    res.json(celebritydata);
})

// TODO: When the server starts successfully, it should log 'Server running on http://localhost:3000'
app.listen(PORT,()=>{
    console.log(`Server is on at port: ${PORT}`);
})
