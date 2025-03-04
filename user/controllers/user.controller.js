const User = require("../models/User.model.js");
const { genPassword, verifyPassword } = require("../utils/password.utils.js");
const bcrypt = require("bcrypt");
const { verify, sign } = require("jsonwebtoken");
const fs = require('fs');
const path = require("path");

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json( users );
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

const createUser = async (req, res) => {
    try {
        const { password, name } = req.body
        const isFound = await User.findOne({ name: name });
        if(isFound) return res.status(409).json({ message: "Username already taken" });
        const user = await User.create({ name: name, password: await genPassword(password) });
        console.log(createAccessToken(user._id));
        res.status(200).json({ message: "User has been successfully created" });
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

const loginUser = async (req, res) => {
    try {
        const { password, name } = req.body;
        const user = await User.findOne({ name: name });
        if(!user) return res.status(404).json({ message: "Such user does not exist"});
        if(!await verifyPassword(password, user.password)) return res.status(401).json({ message: "Invalid password" });

    } catch (err) {
        res.status(500).json({ message: err })
    }
}

const createAccessToken = userId => {
    return sign({ userId }, fs.readFileSync(path.join(__dirname, '../pub.pem'), 'utf8'), {
        expiresIn: '15m',
    })
};

const createRefreshToken = userId => {
    return sign({ userId }, fs.readFileSync(path.join(__dirname, '../priv.pem'), 'utf8'), {
        expiresIn: '7d',
    })
};

module.exports = { getUsers, createUser, loginUser };