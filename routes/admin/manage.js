const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer');
const adminVerify = require('../../middleware/adminAuth')
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

const upload = multer({ storage: storage, limits: { fileSize: 1 * 1024 * 1024 }, fileFilter: imageFileFilter }).single('image')

router.get('/', adminVerify, async (req, res) => {
  const products = await mongoose.model('Product').find().sort({ createdAt: -1 })
  res.status(200).send(products)
})

router.get('/:id', adminVerify, async (req, res) => {
  const _id = req.params.id
  const product = await mongoose.model('Product').findOne({ _id })
  res.status(200).send(product)
})

router.post('/create', adminVerify, (req, res) => {
  upload(req, res, async (error) => {
    if (error) { //instanceof multer.MulterError
      res.status(500);
      if (error.code == 'LIMIT_FILE_SIZE') {
        error.message = 'File Size is too large. Allowed file size is 1MB';
        error.success = false;
      }
      return res.json(error);
    } else {
      if (!req.file) {
        res.status(500);
        res.json('file not found');
      }
      const Product = mongoose.model('Product')
      const product =await new Product({
        imageOriginalName: req.file.originalname,
        imageURL: req.file.path,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        count: req.body.count
      })
      await product.save()
      res.status(200).json({
        success: true,
        message: 'File uploaded successfully!',
        product
      })
    }
  })
})

router.put('/edit/:id', adminVerify, async (req, res) => {
  const _id = req.params.id
  const product = await mongoose.model('Product').findOne({ _id })
  if (!product) return res.status(404).send('product not found.')
  const unlinkAsync = promisify(fs.unlink)
  await unlinkAsync(product.imageURL)
  upload(req, res, async (error) => {
    if (error) { //instanceof multer.MulterError
      res.status(500);
      if (error.code == 'LIMIT_FILE_SIZE') {
        error.message = 'File Size is too large. Allowed file size is 1MB';
        error.success = false;
      }
      return res.json(error);
    } else {
      if (!req.file) {
        res.status(500);
        res.json('file not found');
      }
      await mongoose.model('Product').updateOne({ _id }, /*{ upsert: false },*/ {
        imageOriginalName: req.file.originalname,
        imageURL: req.file.path,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        count: req.body.count,
        updatedAt: Date.now()
      });
      res.status(200).json({
        success: true,
        message: 'File uploaded successfully!',
        product
      })
    }
  })
})

router.delete('/:id', adminVerify, async (req, res) => {
  const product = await mongoose.model('Product').findById(req.params.id)
  if (!product) return res.status(404).send('product not found.')
  const unlinkAsync = promisify(fs.unlink)
  await unlinkAsync(product.imageURL)
  const _id = req.params.id
  await mongoose.model('Product').deleteOne({ _id })
  res.status(200).json({
    message: 'product deleted.'
  })
})

module.exports = router;