const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const URI = "mongodb://localhost:27017/user";

const User = require("./models/User.model.js");
const createUserValidation = require("./validation/user.validation.js");
const checkValidation = require("./validation/check.validation.js");


app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hi! It is User API");
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})

mongoose.connect(URI)
.then( () => console.log("Successfully connected to MongoDB") )
.catch( err => console.log("Error occured: ", err));




// GET USERS
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json( users );
    } catch (err) {
        res.status(500).json({ message: err })
    }
});

//  CREATE USER
app.post("/api/users/create", createUserValidation, checkValidation, async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({ message: "User has been successfully created" });
    } catch (err) {
        res.status(500).json({ message: err })
    }
});