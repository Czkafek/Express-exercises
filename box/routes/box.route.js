const express = require('express');
const router = express.Router();

const { getBoxes, getBoxesByHeight, createBox, updateBox, deleteBox } = require('../controllers/box.controller.js');



// GET ALL BOXES
router.get('/', getBoxes);

// GET A BOX BY A HEIGHT
router.get('/:height', getBoxesByHeight)

// CREATE A NEW BOX
router.post('/create', createBox);

// UPDATE A BOX
router.put('/change/:id', updateBox);

// DELETE A BOX
router.delete('/delete/:id', deleteBox)

module.exports = router;