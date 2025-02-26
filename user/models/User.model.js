const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name field is required"]
        },
        password: {
            type: String,
            required: [true, "Password field is required"]
        }
    }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;