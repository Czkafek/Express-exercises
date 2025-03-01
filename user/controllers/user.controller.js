const User = require("../models/User.model.js");
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
        const salt = await bcrypt.genSalt();
        const newPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ name: name, password: newPassword });
        res.status(200).json({ message: "User has been successfully created" });
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

module.exports = { getUsers, createUser };