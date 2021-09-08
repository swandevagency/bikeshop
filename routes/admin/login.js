const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const jwt=require('jsonwebtoken')

router.post('/', async (req, res) => {
    const { userName, password} = req.body;
    if (!userName || !password) {
        console.log('some fields are empty!');
        res.status(400).send('some fields are empty!');
        return;
    }
    const admin = await mongoose.model('Admin').findOne({userName})
    console.log(admin);
    if (!admin) {
        console.log('admin not exist');
        res.status(400).send('admin not exist');
        return;
    }
    if (admin.password === password) {
        const token = jwt.sign({ _id: admin._id }, process.env.JWT_ADMIN_SECRET||'admin-token')
        res.header('auth-token', token).send(token)
    } else {
        console.log('username or password mismatch.')
        res.status(400).send('username or password mismatch.');
        return;
    }
})
// router.post('/a', async (req, res) => {
//     const { userName, password,phone} = req.body;
    
//     const Admin = await mongoose.model('Admin')
//     const admin=new Admin({userName,password,phone})
//     await admin.save()
//     res.send(admin)
// })
module.exports = router;
