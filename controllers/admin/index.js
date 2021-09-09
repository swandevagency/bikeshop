const adminLogin = async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        messageComponent.emptyField(res)
    }
    const admin = await adminComponent.findAdmin(userName)
    if (!admin) {
        messageComponent.adminNotExist(res)
    }
    const doMatch = await utilComponent.comparePassword(password, admin.password)
    if (!doMatch) {
        messageComponent.wrongPassword(res)
    }
    const token = await adminComponent.createAdminToken(admin)
    messageComponent.createToken(res, token)
}
const getProducts = async (req, res) => {
    const products = await utilComponent.findProducts()
    messageComponent.showProducts(res, products)
}
const getProduct = async (req, res) => {
    const _id = req.params.id
    const product = await utilComponent.findProduct(_id)
    if (!product) messageComponent.productNotExist(res)
    messageComponent.showProduct(res, product)
}
const addProduct = async (req, res) => {
    utilComponent.uploadImage(req, res, async (error) => {
        if (error) { //instanceof multer.MulterError
            messageComponent.fileSize(res, error)
        } else {
            messageComponent.fileExist(req, res)
        }
        const product = await utilComponent.createProduct(req)
        messageComponent.fileUpload(res, product)
    })
}
const editProduct = async (req, res) => {
    const { id } = req.params
    const product = await utilComponent.findProduct(id)
    if (!product) messageComponent.productNotExist(res)
    utilComponent.deleteImage(product)
    utilComponent.uploadImage(req, res, async (error) => {
        if (error) { //instanceof multer.MulterError
            messageComponent.fileSize(res, error)
        } else {
            messageComponent.fileExist(req, res)
        }
        const updatedProduct = await utilComponent.updateProduct(id, req)
        await messageComponent.showUpdateProduct(res, updatedProduct)
    })
}
const deleteProduct = async (req, res) => {
    const { id } = req.params
    const product = await utilComponent.findProduct(id)
    if (!product) messageComponent.productNotExist(res)
    utilComponent.deleteImage(product)
    utilComponent.removeProduct(id)
    messageComponent.deleteProductMessage(res)
}
module.exports = {
    adminLogin,
    getProducts,
    getProduct,
    addProduct,
    editProduct,
    deleteProduct
}