const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name field is required"],
        },
        price: {
            type: Number,
            required: [true, "Price field is required"],
        },
        onDiscount: {
            type: Boolean,
            required: false,
            default: false
        }
    }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;