const { body } = require("express-validator")

const validateCreateBox = [
    body('height')
        .notEmpty().withMessage("Height field is required")
        .isFloat({ min: 1 }).withMessage("Height must be at least 1"),

    body('width')
        .notEmpty().withMessage("Width field is required")
        .isFloat({ min: 1 }).withMessage("Width must be at least 1"),
    
    body('length')
        .if(value => value !== undefined && value !== null && value !== '').isFloat({ min: 1 }).withMessage("Length must be at least 1")
];

module.exports = validateCreateBox;