const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    pay: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required:true
    },
}, { timestamps: true })
module.exports = orderSchema;
