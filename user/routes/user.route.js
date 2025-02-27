const express = require("express");
const router = express.Router();

const { getUsers, createUser } = require("../controllers/user.controller.js");

const createUserValidation = require("../validation/user.validation.js");
const checkValidation = require("../validation/check.validation.js");

router.get('/', getUsers);
router.post('/create', createUserValidation, checkValidation, createUser);

module.exports = router;