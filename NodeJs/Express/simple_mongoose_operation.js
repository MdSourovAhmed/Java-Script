const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 7000;

app.use(express.json());

// Set mongoose strictQuery to true to suppress deprecation warning
mongoose.set('strictQuery', true);

// TODO: Connect to MongoDB database 'music-db'
// Use the options: useNewUrlParser: true, useUnifiedTopology: true
mongoose.connect('mongodb://127.0.0.1:27017/music-db',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});
// TODO: Define the schema for Songs
// Each song should have a 'title' and 'artist', both required and of type String
const songShema=mongoose.Schema({
    title:{type:String,required:true},
    artist:{type:String,required:true}
})
// TODO: Create a model for Songs based on the schema
const Song=mongoose.model('Song',songShema);
// TODO: Create a route to get all songs
// Use the model to retrieve all song records and send them as a JSON response
// Handle any potential errors and send an appropriate response
app.get('/songs',async (req,res)=>{
    try{
        const Songs=await Song.find();
        res.status(200).json(Songs);
    }catch(err){
        console.error(err.stack);
        res.status(500).json({message:'Failed to load Songs.'});
    }
});
// TODO: Create a route to add a new song
// Extract the 'title' and 'artist' from the request body
// Create a new Song document using the model and save it to the database
// Send the created song as a JSON response with a 201 status code
// Handle any potential errors and send an appropriate response
app.post('/songs',async(req,res)=>{
    const {title,artist}=req.body;
    try{
        const newSong=new Song({title,artist});
        await newSong.save();
        res.status(201).json(newSong);
    }catch(err){
        console.error(ree.stack);
        res.status(500).json({message:'Failed to create a new song.'});
    }
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
