const mongoose = require('mongoose');
const adminSchema = require('./admin/index');
const productSchema = require('./admin/product');
const userSchema = require('./user/index');
const orderSchema = require('./user/order');
const paymentSchema=require('./user/payment');

mongoose.model('Admin', adminSchema);
mongoose.model('User', userSchema);
mongoose.model('Product', productSchema);
mongoose.model('Order', orderSchema);
mongoose.model('Payment', paymentSchema);