const express = require('express');
const router = express.Router();

const { getUsers, createUser, deleteUser } = require('../controllers/user.controller.js');
const { validateCreateUser } = require('../validations/user.validation.js');
const checkValidation = require('../validations/check.validation.js');



// GET ALL USERS
router.get('/', getUsers);

// CREATE USER
router.post('/create', validateCreateUser, checkValidation, createUser);

// DELETE USER
router.delete('/delete/:id', deleteUser);

module.exports = router;