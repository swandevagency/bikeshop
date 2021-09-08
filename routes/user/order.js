const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const userVerify = require('../../middleware/userAuth')

router.post('/', userVerify, async (req, res) => {
    const _userId = req.user._id
    const user = await mongoose.model('User').findOne({ _userId })
    if (!user) return res.status(404).send('user not exist.')
    const { title, pay, count } = req.body
    const product = await mongoose.model('Product').findOne({ title })
    if (!product) return res.status(404).send('product not exist.')
    if (product.price !== parseInt(pay)) return res.status(400).send('price of product updated.')
    if (product.count < count) return res.status(400).send('selected items are more than products in storage.')
    const Order = mongoose.model('Order')
    const order = new Order({ title, pay, count, userId:user, productId:product })
    await order.save()
    return res.status(200).send('order have been completed.')
})

module.exports = router;