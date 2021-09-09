const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const key = require('../config/keys')

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) return res.status(404).send('access denied!')
    const token = req.headers.authorization.split(" ")[1]
    if (!token) return res.status(404).send('access denied!')
    try {
        const verified = jwt.verify(token, key.adminToken)
        req.admin = verified
        const { _id } = verified
        const admin = await mongoose.model('Admin').findOne({ _id })
        if (!admin) res.status(403).send('user not exist!')
        next();
    } catch (err) {
        res.status(403).send(err)
    }
}