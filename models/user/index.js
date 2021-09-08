const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    // cart: {
    //     items: [
    //       {
    //         productId: {
    //           type: mongoose.Schema.Types.ObjectId,
    //           ref: 'Product',
    //           required: true
    //         },
    //         quantity: { type: Number, required: true },
    //         _id:false
    //       }
    //     ]
    //   }
})
module.exports = userSchema;
