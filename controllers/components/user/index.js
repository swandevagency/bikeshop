const mongoose = require('mongoose')
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const uniqueEmail = async (email) => {
    const emailExist = await User.findOne({ email })
    if (emailExist) return true
    return false
}
const findEmail = async (email) => {
    const emailExist = await User.findOne({ email })
    return emailExist
}
const findUser = async (_id) => {
    const user=await User.findOne({ _id })
    return user
}
const createUser = async (firstName, lastName, userName, email, password, is2faEnable) => {
    const newPassword = await bcrypt.hash(password, 10)
    const user = await User({
        password: newPassword,
        firstName,
        lastName,
        userName,
        email,
        is2faEnable
    })
    await user.save()
    return user
}
const updateUser = async (firstName, lastName, userName, email, is2faEnable,id) => {
    // const user = await User.updateOne({ _id:id }, {
    //     firstName,
    //     lastName,
    //     userName,
    //     email,
    //     is2faEnable
    // })
    const user=await User.findOne({_id:id})
    user.firstName=firstName
    user.lastName=lastName
    user.userName=userName
    user.email=email
    user.is2faEnable=is2faEnable
    await user.save()
    return user
}
const passwordCheck = async (password, userPassword) => {
    const match = await bcrypt.compare(password, userPassword)
    if (match) return true
    return false
}
const createMainToken = async (user,res) => {
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.header('auth-token', token).send(token)
}
const createOtpToken=async(user,res)=>{
    const newOtpPassword = Math.floor(100000 + Math.random() * 900000)
        user.otpPassword = newOtpPassword
        await user.save()
        console.log(newOtpPassword);
        const otpToken = await jwt.sign({ _id: user._id , newOtpPassword }, process.env.OTP_SECRET,{expiresIn: "120s"})
        res.header('auth-token', otpToken).send(otpToken)
}
const findOtpToken=(req)=>{
    const otpToken = req.headers.authorization.split(" ")[1]
    return otpToken
}
const otpTokenIsMatch=(otpToken,newUser)=>{
    const verified = jwt.verify(otpToken, process.env.OTP_SECRET)
    newUser = verified
    const { _id } = verified
    console.log(_id);
    return _id
}

module.exports = {
    uniqueEmail,
    createUser,
    updateUser,
    findEmail,
    findUser,
    passwordCheck,
    createMainToken,
    createOtpToken,
    findOtpToken,
    otpTokenIsMatch
}