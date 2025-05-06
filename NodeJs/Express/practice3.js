const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Set mongoose strictQuery to true to suppress deprecation warning
mongoose.set('strictQuery', true);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/gadget-inventory-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('Connected to MongoDB');

    // Insert dummy data into the database
    const Gadget = mongoose.model('Gadget', gadgetSchema);

    // Clear existing data
    await Gadget.deleteMany({});

    // Insert dummy gadgets
    await Gadget.create([
        { name: 'Smartphone', brand: 'Brand A', inStock: true },
        { name: 'Laptop', brand: 'Brand B', inStock: false }
    ]);
}).catch((error) => {
    console.error('Connection error', error);
    process.exit(1);
});

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Define a schema and model for Gadget items
// The schema should include:
// - name: String, required
// - brand: String, required
// - inStock: Boolean, required
const gadgetSchema=new mongoose.Schema({
    name: {type:String, required:true},
    brand: {type:String, required:true},
    inStock: {type:Boolean, required:true}
});

const Gadget = mongoose.model('Gadget', gadgetSchema);
// TODO: Route to get all gadgets
// Create an endpoint to handle GET requests at '/gadgets'
// Use Gadget model to fetch all gadget records from the database
// Respond with the list of gadgets in JSON format
app.get('/gadgets',async (req,res)=>{
    try{
        const Gadgets=await Gadget.find({});
        if(!Gadgets)return res.status(404).json({message:'No Gadgets were found.'});
        res.status(200).json(Gadgets);
    }catch(err){
        res.status(500).json({message:'Failed to read from the Database.'});
    }
});
// TODO: Route to delete a gadget by ID
// Create an endpoint to handle DELETE requests at '/gadgets/:id'
// Extract the gadget ID from the request parameters
// Use Gadget model to find and delete the gadget by its ID
// If the gadget is not found, respond with a 404 status and an error message
// If deletion is successful, respond with a success message
// Handle errors with a 500 status and an appropriate error message
app.delete('/gadgets/:id',async(req,res)=>{
    const {id}=req.params;
    try{
        const deletedGadget=await Gadget.findByIdAndDelete(id);
        if(!deletedGadget)res.status(404).json({message:'Gadget not found by this id.'});
        res.status(200).json({message:'Deletion completed successfully.'});
    }catch(err){
        res.status(500).json({message:'Failed to deletw the Gadget.'});
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
