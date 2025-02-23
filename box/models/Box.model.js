const mongoose = require('mongoose');

const BoxSchema = mongoose.Schema(
{
    height: {
        type: Number,
        required: [true, "Height field is required"],
    },
    width: {
        type: Number,
        required: [true, "Width field is required"],
    },
    length: {
        type: Number,
        required: false,
        default: 1,
    }
},
{    
    timestamps: true
}
);

const Box = mongoose.model("Box", BoxSchema);

module.exports = Box;