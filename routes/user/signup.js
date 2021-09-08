const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bcrypt = require('bcryptjs');


router.post('/', async (req, res) => {
    const { userName, email, password } = req.body;
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!userName || !password ) {
        console.log('user entry is not correct!');
        res.status(400).send('some fields are empty.');
        return;
    }
    if (!email || !regex.test(email)){
        res.status(400).send({
            message: "Please provide a valid email"
        });
        return;
    }
    const User = mongoose.model('User');
    const emailIsNotUnique = await User.findOne({ email })
    if (emailIsNotUnique) {
        console.log('email exist!');
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