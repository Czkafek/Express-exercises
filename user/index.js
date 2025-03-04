const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
const URI = "mongodb://localhost:27017/user";

const userRoute = require("./routes/user.route.js");
const { cookie } = require("express-validator");


app.use(cookieParser());
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
