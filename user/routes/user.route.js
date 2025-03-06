const express = require("express");
const cookieParser = require("cookie-parser")
const router = express.Router();

router.use(cookieParser());

const { getUsers, createUser, loginUser, logoutUser, protectedRoute, refreshRoute } = require("../controllers/user.controller.js");

const createUserValidation = require("../validation/user.validation.js");
const checkValidation = require("../validation/check.validation.js");

router.get('/', getUsers);
router.post('/create', createUserValidation, checkValidation, createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/protected', protectedRoute);
router.post('/refresh_token', refreshRoute);

module.exports = router;