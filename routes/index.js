const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
require('../controllers/index')

module.exports = (app) => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static(path.join(__dirname, 'uploads')))
    //admin routes
    app.post('/admin/login', adminController.adminLogin);
    app.get('/admin/manage', adminVerify, adminController.getProducts);
    app.get('/admin/manage/:id', adminVerify, adminController.getProduct);
    app.post('/admin/manage/create', adminVerify, adminController.addProduct);
    app.put('/admin/manage/edit/:id', adminVerify, adminController.editProduct);
    app.delete('/admin/manage/:id', adminVerify, adminController.deleteProduct);
    //user routes
    app.post('/user/signup', userController.userRegister);
    app.post('/user/login', userController.userLogin);
    app.get('/user/me',userVerify,userController.userProfile);
    app.put('/user/me/edit',userVerify,userController.editProfile);
    app.get('/user/product', userVerify,userController.getProducts);
    app.get('/user/product/:id', userVerify,userController.getProduct);
    // app.use('/user/cart', require('./user/cart'));
    app.post('/user/order',userVerify,userController.orderProduct);
    // app.use('/user/payment', require('./user/payment'));
}