const express = require('express');
const mongoose = require('mongoose');
const Person = require('./models/Person.model.js');
const app = express();
const port = 3000;

app.use(express.json());

const mongoURI='mongodb://localhost:27017/Person';

mongoose.connect(mongoURI)
.then(() => console.log('Successfully connected to MongoDB.'))
.catch(err => console.error('MongoDB connection error: ', err));


app.get('/', (req, res) => {
    res.send("Person api");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})


// POST ENDPOINT - creates a new person in a database
app.post('/api/people', async (req, res) => {
    try {
        const person = await Person.create(req.body);
        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// GET ENDPOINT - finds and returns in json all records from Person
app.get('/api/people', async (req, res) => {
    try {
        const people = await Person.find({});
        res.status(200).json(people);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// GET ENDPOINT - finds and returns records from Person with a given name
app.get('/api/people/name/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const people = await Person.find({name: name});
        res.status(200).json(people);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// GET ENDPOINT - find and returns records from Person with a given email
app.get('/api/people/email/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const people = await Person.find({email: email});
        res.status(200).json(people);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})