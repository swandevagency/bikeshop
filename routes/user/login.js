const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const key = require('../../config/keys')

router.put('/', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        console.log('email or password is empty!');
        res.status(400).send('email or password is empty!');
        return;
    }
    const user = await mongoose.model('User').findOne({ email })
    if (!user) {
        console.log('user not exist');
        res.status(400).send('user not exist');
        return;
    }
    const doMatch = await bcrypt.compare(password, user.password)
    if (!doMatch) {
        console.log('password or email mismatch.')
        res.status(400).send('password or email mismatch.');
        return;
    }
        const token = await jwt.sign({ _id: user._id }, key.usertoken)
        res.header('auth-token', token).send(token)
})

module.exports = router;

