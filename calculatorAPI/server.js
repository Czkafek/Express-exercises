const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("Hi! It is Calculator API!");
});

// GET Addition endpoint
app.get('/add/:num1/:num2',(req, res) => {
    const num1 = parseFloat(req.params.num1);
    const num2 = parseFloat(req.params.num2);
    const result = num1 + num2;
    res.json({
        operation: "Addition",
        num1: num1,
        num2: num2,
        result: result
    });
});

// GET Subtraction endpoint
app.get('/subtract/:num1/:num2', (req, res) => {
    const num1 = parseFloat(req.params.num1);
    const num2 = parseFloat(req.params.num2);
    const result = num1 - num2;
    res.json({
        operation: "Subtraction",
        num1: num1,
        num2: num2,
        result: result
    });
});

// GET Multiplication endpoint
app.get("/multiply/:num1/:num2", (req, res) => {
    const num1 = parseFloat(req.params.num1);
    const num2 = parseFloat(req.params.num2);
    const result = num1 * num2;
    res.json({
        operation: "Multiplication",
        num1: num1,
        num2: num2,
        result: result
    });
});

// GET Division endpoint
app.get('/divide/:num1/:num2', (req, res) => {
    const num1 = parseFloat(req.params.num1);
    const num2 = parseFloat(req.params.num2);
    if(num2 === 0) res.status(400).json({error: "Can not divide by zero"});
    const result = num1 / num2;
    res.json({
        operation: "Division",
        num1: num1,
        num2: num2,
        result: result
    });
});




app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})

