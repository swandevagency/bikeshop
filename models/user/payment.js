const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    resnumber: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    payment: {
        type: Boolean,
        default: false
    },
})
module.exports = paymentSchema;
