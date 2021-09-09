const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const Order = mongoose.model('Order')
const multer = require('multer');
const fs = require('fs')
const { promisify } = require('util')
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + '_' + file.originalname);
    }
});
const imageFileFilter = (req, file, cb) => {
    var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb({
            success: false,
            message: 'Invalid file type. Only jpg, png, gif image files are allowed.'
        }, false);
    }
};
const uploadImage = multer({ storage: storage, limits: { fileSize: 1 * 1024 * 1024 }, fileFilter: imageFileFilter }).single('image')

const comparePassword = async (password, newPassword) => {
    const doMatch = await bcrypt.compare(password, newPassword)
    return doMatch
}
const hashPassword = async (password) => {
    const newPassword = await bcrypt.hash(password, 10)
    return newPassword
}
const findProducts = async () => {
    const products = await Product.find().sort({ createdAt: -1 })
    return products
}
const findProduct = async (_id) => {
    const product = await Product.findOne({ _id })
    return product
}
const createProduct = async (req) => {
    const product = await new Product({
        imageOriginalName: req.file.originalname,
        imageURL: req.file.path,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        count: req.body.count
    })
    await product.save()
    return product
}
const fileUpload = async (res) => {
    return res.status(200).json({
        success: true,
        message: 'File uploaded successfully!',
        product
    })
}
const deleteImage = async (product) => {
    const unlinkAsync = promisify(fs.unlink)
    await unlinkAsync(product.imageURL)
}
const updateProduct = async (_id, req) => {
    await Product.updateOne({ _id }, /*{ upsert: false },*/ {
        imageOriginalName: req.file.originalname,
        imageURL: req.file.path,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        count: req.body.count,
        updatedAt: Date.now()
    });
    const product = await Product.findOne({ _id })
    await product.save()
    return product
}
const removeProduct = async (_id) => {
    await Product.deleteOne({ _id })
}
const createOrder = async (pay, quantity, user, product) => {
    const order = new Order({ pay, count:quantity, userId: user, productId: product })
    await order.save()
    const _id=product._id
    const newCount=product.count-quantity
    await Product.updateOne({ _id },{
        count: newCount,
        updatedAt: Date.now()
    });
    return order
}
module.exports = {
    hashPassword,
    comparePassword,
    findProducts,
    findProduct,
    uploadImage,
    createProduct,
    fileUpload,
    deleteImage,
    updateProduct,
    removeProduct,
    createOrder
}