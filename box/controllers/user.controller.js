const User = require("../models/User.model.js");

const getUsers = async (req, res) => {
    try {
        const result = await User.find({});
        if (!result) return res.status(404).json({ message: "There is no user" });
        res.status(200).json({ result });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({ message: "User has been successfully created" });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User has not been found" });
        res.status(200).json({ message: "User has been successfully deleted" });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = { getUsers, createUser, deleteUser }