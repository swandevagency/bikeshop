const express=require('express')
const bodyParser = require('body-parser')
const path=require('path')
require('../controllers/index')

module.exports = (app) => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static(path.join(__dirname, 'uploads')))
    app.use('/admin/login', require('./admin/login'));
    app.use('/admin/manage', require('./admin/manage'));
    app.use('/user/signup', require('./user/signup'));
    app.use('/user/login', require('./user/login'));
    app.use('/user/me', require('./user/profile'));
    app.use('/user/product', require('./user/product'));
    // app.use('/user/cart', require('./user/cart'));
    app.use('/user/order', require('./user/order'));
    // app.use('/user/payment', require('./user/payment'));
}