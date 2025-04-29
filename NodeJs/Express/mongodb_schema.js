const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// TODO: Set mongoose strictQuery to true to suppress deprecation warning
mongoose.set('strictQuery', true);
// TODO: Connect to MongoDB
// Use database name "comic-heroes"
mongoose.connect('mongodb://127.0.0.1:27017/comic-heroes', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// TODO: Use express.json() middleware to parse JSON request bodies
app.use(express.json());

// TODO: Define schema for superhero with alias and superpower fields (required fields)
const superheroSchema = new mongoose.Schema({
    alias: { type: String, required: true },
    superpower: { type: String, required: true }
});

// TODO: Create model from the schema
const Superhero=new mongoose.model('Superhero',superheroSchema);

// TODO: Set up a route to add a new superhero
app.post('/heroes',async (req,res)=>{
    try{
        const {alias,superpower}=req.body;
        
        if (!alias || !superpower) {
            return res.status(400).send({ error: 'Both alias and superpower are required.' });
        }
        const superhero= new Superhero({alias,superpower});
        
        const savehero=await superhero.save();
        res.status(201).send(savehero);
    }catch(err){
        res.status(500).send({error:'error saving the superhero: '+err.message});
    }
});

// TODO: Set up a route to get all superheroes
app.get('/heroes',async(req,res)=>{
   try{ 
    const Heroes=await Superhero.find();
    res.status(201).send(Heroes);
    }catch(err){
    res.status(500).send({error:'Error fetching heroes: '+err.message})    
    }
});

// TODO: Start the Express server on the defined port
app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
});


