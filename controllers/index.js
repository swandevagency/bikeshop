require('../components/index')
const express = require('express')
global.router = express.Router()
global.userVerify = require('../middleware/userAuth')
global.adminVerify = require('../middleware/adminAuth')

global.userController = require('../controllers/user/index')
global.adminController = require('../controllers/admin/index')
