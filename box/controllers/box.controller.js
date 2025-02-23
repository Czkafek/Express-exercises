const Box = require('../models/Box.model.js');

const getBoxes = async (req, res) => {
    try {
        const boxes = await Box.find({});
        res.status(200).json({ boxes });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getBoxesByHeight = async (req, res) => {
    try {
        const boxes = await Box.find({height: req.params.height});
        if (!boxes) return res.status(404).json({ message: "Box not found"});
        res.status(200).json({ boxes });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const createBox = async (req, res) => {
    try {   
        const box = await Box.create(req.body);
        res.status(200).json({ box });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const updateBox = async (req, res) => {
    try {
        const box = await Box.findByIdAndUpdate(req.params.id, req.body);
        if (!box) return res.status(404).json({ message: "Box not found" })
        const updatedBox = await Box.findById(req.params.id);
        res.status(200).json({ updatedBox });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const deleteBox = async (req, res) => {
    try {
        const box = await Box.findByIdAndDelete(req.params.id);
        if(!box) return res.status(404).json({ message: "Box not found" });
        res.status(200).json({ message: "Box deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};


module.exports = { getBoxes, getBoxesByHeight, createBox, updateBox, deleteBox };