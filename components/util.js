const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const Product = mongoose.model('Product')
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

const findProducts = async () => {
    const products = await Product.find().sort({ createdAt: -1 })
    return products
}
const findProduct = async (req) => {
    const _id = req.params.id
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
const updateProduct = async (req) => {
    const _id = req.params.id
    const product=await Product.updateOne({ _id }, /*{ upsert: false },*/ {
        imageOriginalName: req.file.originalname,
        imageURL: req.file.path,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        count: req.body.count,
        updatedAt: Date.now()
    });
}
const removeProduct=async(req)=>{
    const _id = req.params.id
    await Product.deleteOne({ _id })
}
module.exports = {
    comparePassword,
    findProducts,
    findProduct,
    uploadImage,
    createProduct,
    fileUpload,
    deleteImage,
    updateProduct,
    removeProduct
}