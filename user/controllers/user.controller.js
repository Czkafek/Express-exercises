const User = require("../models/User.model.js");
const { genPassword, verifyPassword } = require("../utils/password.utils.js");
const bcrypt = require("bcrypt");

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
        await User.create({ name: name, password: await genPassword(password) });
        res.status(200).json({ message: "User has been successfully created" });
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

module.exports = { getUsers, createUser };