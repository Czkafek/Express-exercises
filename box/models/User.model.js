const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name field is required"]
        },
        email: {
            type: String,
            required: [true, "Email field is required"]
        },
        password: {
            type: String,
            required: [true, "Password field is required"]
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;