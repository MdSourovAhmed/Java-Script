const express = require('express');
const { json } = require('express/lib/response');

const app = express();
const PORT = 3000;

app.use(express.json());

// Mock data
const teams = [
    { id: 1, name: 'Lakers', city: 'Los Angeles' },
    { id: 2, name: 'Warriors', city: 'San Francisco' }
];

const players = [
    { id: 1, name: 'LeBron James', teamId: 1 },
    { id: 2, name: 'Stephen Curry', teamId: 2 }
];

// Create a Team
app.post('/teams', (req, res) => {
    // TODO: Retrieve name and city from request body
    const {name, city}=req.body;
    // TODO: Validate that name and city are present in request
    if(!name||!city)return res.status(400).json({message:'No valid team found.'});
    // TODO: Create a new team object and add to teams array
    const newTeam={id:teams.length+1, name,city};
    teams.push(newTeam);
    // TODO: Respond with status 201 and the new team object
    res.status(201).json(newTeam);
});

// Create a Player
app.post('/players', (req, res) => {
    // TODO: Retrieve name and teamId from request body
    const {name, teamId}=req.body;
    // TODO: Validate that name and teamId are present in request
    if(!name||!teamId)return res.status(400).send({message:'No valid player found.'});
    // TODO: Create a new player object and add to players array
    const newPlayer={id:players.length+1, name,teamId};
    players.push(newPlayer);
    // TODO: Respond with status 201 and the new player object
    res.status(201).json(newPlayer);
});

// Retrieve a Team with the associated Players
app.get('/teams/:id', (req, res) => {
    // TODO: Find the team by id from request params
    const team=teams.find(id=>id.id=== +req.params.id);
    // TODO: If team not found, respond with 404
    if(!team)return res.status(401).send('Team not found.');
    // TODO: Find associated players in players array
    const player=players.find(p=>p.id===team.id);
    // TODO: Respond with the team object combined with its players
    res.json({...team,player});
});

// Retrieve all Players
app.get('/players', (req, res) => {
    // TODO: Map through players and find associated team for each player
    const playerdetail=players.map(p=>{
        const detail=teams.find(t=>t.id===p.id);
        
        return {...p, detail};
    });
    // TODO: Respond with the list of detailed players
    res.json(playerdetail);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});





