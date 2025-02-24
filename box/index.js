const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const URI = 'mongodb://localhost:27017/box';
const boxRoute = require('./routes/box.route.js');
const userRoute = require('./routes/user.route.js');


// MIDDLEWARE
app.use(express.json());


// ROUTES
app.use('/api/boxes', boxRoute)
app.use('/api/user', userRoute);


mongoose.connect(URI)
.then(() => console.log("Connected successfully to MongoDB"))
.catch(err => console.log("Connection to MongoDB failed: ", err));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send("Box API");
})




// API
/*
// CREATE A NEW BOX
app.post('/api/createbox', async (req, res) => {
    try {   
        const box = await Box.create(req.body);
        res.status(200).json({ box });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// GET ALL BOXES
app.get('/api/boxes', async (req, res) => {
    try {
        const boxes = await Box.find({});
        res.status(200).json({ boxes });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// GET A BOX BY A HEIGHT
app.get('/api/boxes/:height', async (req, res) => {
    try {
        const boxes = await Box.find({height: req.params.height});
        if (!boxes) return res.status(404).json({ message: "Box not found"});
        res.status(200).json({ boxes });
    } catch (err) {
        res.status(500).json({ message: err });
    }
})

// UPDATE A BOX
app.put('/api/changebox/:id', async (req, res) => {
    try {
        const box = await Box.findByIdAndUpdate(req.params.id, req.body);
        if (!box) return res.status(404).json({ message: "Box not found" })
        const updatedBox = await Box.findById(req.params.id);
        res.status(200).json({ updatedBox });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// DELETE A BOX
app.delete('/api/deletebox/:id', async (req, res) => {
    try {
        const box = await Box.findByIdAndDelete(req.params.id);
        if(!box) return res.status(404).json({ message: "Box not found" });
        res.status(200).json({ message: "Box deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err });
    }
})
*/