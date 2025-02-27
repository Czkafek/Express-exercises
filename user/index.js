const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const URI = "mongodb://localhost:27017/user";

const User = require("./models/User.model.js");
const userRoute = require("./routes/user.route.js");
const createUserValidation = require("./validation/user.validation.js");
const checkValidation = require("./validation/check.validation.js");


app.use(express.json());

app.use("/api/users", userRoute);


app.get("/", (req, res) => {
    res.send("Hi! It is User API");
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})

mongoose.connect(URI)
.then( () => console.log("Successfully connected to MongoDB") )
.catch( err => console.log("Error occured: ", err));
