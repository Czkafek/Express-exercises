const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("QUERY EXERCISE");
});


// PRODUCTS
const products = [
    { Price: 12.99, Category: "furniture", Name: "Table" },
    { Price: 199.99, Category: "furniture", Name: "Chair" },
    { Price: 49.99, Category: "furniture", Name: "Sofa" },
    { Price: 79.99, Category: "furniture", Name: "Bookshelf" },
    { Price: 249.99, Category: "furniture", Name: "Dining Table" },
    { Price: 299.99, Category: "furniture", Name: "Wardrobe" },
    { Price: 99.99, Category: "electronics", Name: "Bluetooth Speaker" },
    { Price: 249.99, Category: "electronics", Name: "Laptop" },
    { Price: 199.99, Category: "electronics", Name: "Smartphone" },
    { Price: 59.99, Category: "electronics", Name: "Wireless Mouse" },
    { Price: 129.99, Category: "electronics", Name: "Headphones" },
    { Price: 79.99, Category: "electronics", Name: "Smartwatch" },
    { Price: 15.99, Category: "house", Name: "Lamp" },
    { Price: 39.99, Category: "house", Name: "Rug" },
    { Price: 5.99, Category: "house", Name: "Curtains" },
    { Price: 3.99, Category: "house", Name: "Cushion Cover" },
    { Price: 10.99, Category: "house", Name: "Picture Frame" },
    { Price: 1.99, Category: "food", Name: "Apple" },
    { Price: 2.99, Category: "food", Name: "Banana" },
    { Price: 4.99, Category: "food", Name: "Bag of Rice" }
];



// GET endpoint query for greet with name and age
app.get('/greet', (req, res) => {
    const { query: { name, age } } = req;
    if(!name && !age) return res.send("Hi!");
    if(!name) return res.send(`Hi, you are ${age} years old`);
    if(!age) return res.send(`Hi ${name}!`);
    res.send(`Hi ${name}! You are ${age} years old`);
});

// PRODUCT FILTER GET ENDPOINT
app.get('/products', (req, res) => {
    const { minPrice, maxPrice, category } = req.query;

    let newProducts = [...products];

    if (minPrice) newProducts = newProducts.filter((products) => products.Price > parseFloat(minPrice));
    if (maxPrice) newProducts = newProducts.filter((products) => products.Price < parseFloat(maxPrice));
    if (category) newProducts = newProducts.filter((product) => product.Category === category);

    res.status(200).json(newProducts);

});

// PAGINATION GET ENDPOINT
app.get('/search', (req, res) => {
    const { q, page = 1, limit = 10, sortBy = 'relevance' } = req.query;

    if(!q) res.status(400).send("search query is required");

    res.status(200).json({
        search: q,
        pagination: {
            page: page,
            limit: limit,
        },
        sortMethod: sortBy,
        message: `Searching for '${q}' on page ${page} with ${limit} results per page, sorted by ${sortBy}`
    });

});

// ARRAY PROCESSING GET ENDPOINT
app.get('/calculate', (req, res) => {
    const { numbers, operations } = req.query;

    if(!numbers || !operations) return res.status(400).send("Please provide numbers and operations");

    const nums = numbers.split(',').map(Number);
    const ops = operations.split(',');

    let results = {};

    for(const op of ops) {
        switch (op) {
            case 'sum':
                results.sum = nums.reduce((a, b) => a+b, 0);
                break;
            case 'average':
                results.average = nums.reduce((a, b) => (a+b), 0) / nums.length;
                break;
            case 'min':
                results.min = Math.min(...nums);
                break;
            case 'max':
                results.max = Math.max(...nums);
        }
    }
    
    res.send(results);

});




app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})