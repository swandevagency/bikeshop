const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const key = require('../config/keys')

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) return res.status(404).send('access denied!')
    const token = req.headers.authorization.split(" ")[1]
    if (!token) return res.status(404).send('access denied!')
    try {
        const verified = jwt.verify(token, key.userToken)
        req.user = verified
        const { _id } = verified
        const user = await mongoose.model('User').findOne({ _id })
        if (!user) res.status(403).send('user not exist!')
        if (user.isBlocked) {
            return res.status(201).send('user is block.')
        }
        next();
    } catch (err) {
        res.status(403).send(err)
    }
}