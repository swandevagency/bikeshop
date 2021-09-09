const mongoose = require('mongoose')
const User = mongoose.model('User');
const key = require('../config/keys')
const jwt = require('jsonwebtoken')

const findUserByEmail = async (email) => {
    const user = await User.findOne({ email })
    return user
}
const findUserById = async (id) => {
    const user = await User.findOne({ id })
    return user
}
const createUser = async (userName, email, newPassword) => {
    const user = new User({
        password: newPassword,
        userName,
        email
    })
    await user.save()
    return user
}
const updateUser = async (id, userName, email) => {
    await User.updateOne({ id }, {
        userName,
        email
    });
}
const createUserToken = async (user) => {
    const token = jwt.sign({ _id: user._id }, key.userToken, { expiresIn: '1d' })
    return token
}
module.exports = {
    findUserByEmail,
    findUserById,
    createUser,
    updateUser,
    createUserToken
}