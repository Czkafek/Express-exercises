const { body } = require('express-validator');

const validateCreateUser = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 and 50 characters'),

    body('email')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isEmail().withMessage('Must be a valid email address')
        .normalizeEmail(),

        body('password')
            .trim()
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
            .custom(value => {
                const hasLowerCase = /[a-z]/.test(value);
                const hasUpperCase = /[A-Z]/.test(value);
                const hasNumber = /[0-9]/.test(value);
                const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

                if (!hasLowerCase || !hasUpperCase || !hasNumber || !hasSpecialChar) {
                    throw new Error("Password must contain at least one lowercase letter, one uppercase letter, one number and one special character");
                }

                return true;
            }),
];

module.exports = { validateCreateUser };