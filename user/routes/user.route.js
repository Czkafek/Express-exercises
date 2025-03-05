const express = require("express");
const router = express.Router();

function checkToken() {
    console.log("Check Token");
}

const { getUsers, createUser, loginUser, logoutUser } = require("../controllers/user.controller.js");

const createUserValidation = require("../validation/user.validation.js");
const checkValidation = require("../validation/check.validation.js");

router.get('/', getUsers);
router.post('/create', createUserValidation, checkValidation, createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;