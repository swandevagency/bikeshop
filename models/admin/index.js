const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default:'0912'
    }
})
module.exports = adminSchema
