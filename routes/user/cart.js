const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const userVerify = require('../../middleware/userAuth')

router.post('/:id', userVerify, async (req, res) => {
    const _prodId = req.params.id
    const _userId = req.user._id
    let userQuantity = parseInt(req.body.quantity);
    const product = await mongoose.model('Product').findOne({ _prodId })
    const user = await mongoose.model('User').findOne({ _userId })
    if (!product) return res.status(404).send('product not exist.')
    if (!user) return res.status(404).send('user not exist.')

    const existItem = user.cart.items.find(item => JSON.stringify(item.productId).split('"')[1] === _prodId)
    if (typeof existItem === "undefined") {
        user.cart.items.push({
            productId: _prodId,
            quantity: userQuantity
        });
        await user.save();
        return res.status(200).send(user.cart)
    }
    else {
        existItem.quantity = existItem.quantity + userQuantity
        await user.save();
        return res.status(200).send(user.cart)
    }
})

router.get('/', userVerify, async (req, res) => {
    const _userId = req.user._id
    const user = await mongoose.model('User').findOne({ _userId })
    if (!user) return res.status(404).send('user not exist.')
    return res.status(200).send(user.cart)
})

module.exports = router;