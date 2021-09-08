const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    imageOriginalName: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true,
        default: 0
    },
}, { timestamps: true })
module.exports = productSchema;
