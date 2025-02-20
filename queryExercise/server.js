const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("QUERY EXERCISE");
});



// GET endpoint query for greet with name and age
app.get('/greet', (req, res) => {
    const { query: { name, age } } = req;
    if(!name && !age) return res.send("Hi!");
    if(!name) return res.send(`Hi, you are ${age} years old`);
    if(!age) return res.send(`Hi ${name}!`);
    res.send(`Hi ${name}! You are ${age} years old`);
});



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})