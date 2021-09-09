const key=require('../config/keys')
const mongoose=require('mongoose')
const Admin= mongoose.model('Admin')
const jwt=require('jsonwebtoken')

const findAdmin = async (userName) => {
    const admin = await Admin.findOne({ userName })
    return admin
}
const createAdminToken=async(admin)=>{
    console.log(admin);
    const token = jwt.sign({ _id: admin._id }, key.adminToken)
    return token
}

module.exports={
    findAdmin,
    createAdminToken
}