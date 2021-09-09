const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bcrypt = require('bcryptjs');


router.post('/', async (req, res) => {
    const { userName, email, password } = req.body;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passRegex= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{6,}$/;
    if (!userName ||!email || !password) {
        res.status(400).send('please enter all fields.');
        return;
    }
    if (!emailRegex.test(email)){
        res.status(400).send({
            message: "Please provide a valid email."
        });
        return;
    }
    if(!passRegex.test(password)){
        res.status(400).send({
            message: `The password string must contain at least 1 lowercase ,1 uppercase ,1 numeric and 1 special character and six characters or longer.`
        });
        return;
    }
    const User = mongoose.model('User');
    const emailIsNotUnique = await User.findOne({ email })
    if (emailIsNotUnique) {
        res.status(400).send('email already existed');
        return;
    }
    const newPassword = await bcrypt.hash(password, 10)
    const user = new User({
        password:newPassword,
        userName,
        email
    })
    await user.save()
    res.status(200).send(user)
})
module.exports = router