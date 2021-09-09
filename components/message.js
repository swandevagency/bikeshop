const emptyField = async (res) => {
    return res.status(400).send('some fields are empty.');
}
const adminNotExist = async (res) => {
    return res.status(400).send('admin not exist.');
}
const wrongPassword= async(res)=>{
    return res.status(400).send('password mismatch.');
}
const fileSize=async(res,error)=>{
    if (error.code == 'LIMIT_FILE_SIZE') {
        error.message = 'File Size is too large. Allowed file size is 1MB';
        error.success = false;
      }
      return res.status(500).json(error);
}
const fileExist=async(req,res)=>{
    if (!req.file) {
        return res.status(500).json('file not found');
      }
}
const fileUpload=async(res,product)=>{
    return res.status(200).json({
        success: true,
        message: 'File uploaded successfully!',
        product
      })

}
const showProducts=async(res,products)=>{
    return res.status(200).send(products)
}
const showProduct=async(res,product)=>{
    return res.status(200).send(product)
}
const createToken=async(res,token)=>{
    return res.header('auth-token', token).send(token)
}
const productNotExist=async(res)=>{
    return res.status(404).send('product not found.')
}
const showUpdateProduct=async(res,product)=>{
    return res.status(200).json({
        success: true,
        message: 'File uploaded successfully!',
        product
      })
}
const deleteProductMessage=async(res)=>{
    return res.status(200).json({
        message: 'product deleted.'
      }) 
}
module.exports={
    emptyField,
    adminNotExist,
    wrongPassword,
    fileSize,
    deleteProductMessage,
    showUpdateProduct,
    productNotExist,
    createToken,
    fileExist,
    fileUpload,
    showProducts,
    showProduct   
}