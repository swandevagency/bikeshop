const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const userVerify = require('../../middleware/userAuth')

router.get('/', userVerify, async (req, res) => {
  const products = await mongoose.model('Product').find().sort({ createdAt: -1 })
  res.status(200).send(products)
})

router.get('/:id', userVerify, async (req, res) => {
  const _id = req.params.id
  const product = await mongoose.model('Product').findOne({ _id })
  res.status(200).send(product)
})

module.exports = router;