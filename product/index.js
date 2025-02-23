const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product.model.js');
const app = express();
const port = 3000;

app.use(express.json());

const mongoURI = 'mongodb://localhost:27017/Products';



// CONNECTION WITH A DB
mongoose.connect(mongoURI)
.then(() => console.log('Successfully connected to MongoDB.'))
.catch(err => console.error('MongoDB connection error: ', err));

app.get('/', (req, res) => {
    res.send("Welcome in Products API!");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});



app.post('/api/addproduct', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const result = await Product.find({});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

app.get('/api/products/name/:name', async (req, res) => {
    try {
        const result = await Product.find({name: req.params.name});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});


app.put('/api/changeproduct/byid/:id', async (req, res) => {
    try {
        const { id } = req.params;

        //await Product.findByIdAndUpdate(id, req.body);
        const product = await Product.findOneAndUpdate({_id: id}, req.body);

        if(!product) return res.status(404).json({ message: "Product not found" });
        const updatedProduct = await Product.findById(id);
        res.status(500).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

app.delete('/api/product/byid/:id', async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findOneAndDelete({_id: id});

        if(!product) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ message: "Product deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: err });
    }
})





