const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema(
{
    name: {
        type: String,
        required: [true, "Person name is required"],
    },
    email: {
        type: String,
        required: [true, "Person email is required"],
    },
    age: {
        type: Number,
        required: false,
        default: 0,
    }
},
{
    timestamps: true
}
);

const Person = mongoose.model("Person", PersonSchema);

module.exports = Person;