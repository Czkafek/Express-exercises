const { body } = require("express-validator");

const createUserValidation = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name field is required")
        .isLength({ min: 3, max: 50 }).withMessage("Name must be between 3 and 50 characters"),

    body("password")
        .trim()
        .notEmpty().withMessage("Password field is required")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
        .contains()
];

module.exports = createUserValidation;