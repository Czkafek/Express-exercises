const express = require('express');
const router = express.Router();

const Box = require('../models/Box.model.js');

const { getBoxes, getBoxesByHeight, createBox, updateBox, deleteBox } = require('../controllers/box.controller.js');



// GET ALL BOXES
router.get('/boxes', getBoxes);

// GET A BOX BY A HEIGHT
router.get('/boxes/:height', getBoxesByHeight)

// CREATE A NEW BOX
router.post('/createbox', createBox);

// UPDATE A BOX
router.put('/changebox/:id', updateBox);

// DELETE A BOX
router.delete('/deletebox/:id', deleteBox)

module.exports = router;