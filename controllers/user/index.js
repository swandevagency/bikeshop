const userRegister = async (req, res) => {
    const { userName, email, password } = req.body;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{6,}$/;
    if (!userName || !email || !password) {
        return messageComponent.emptyField(res)
    }
    if (!emailRegex.test(email)) {
        return messageComponent.emailNotValid(res)
    }
    if (!passRegex.test(password)) {
        return messageComponent.passwordNotValid(res)
    }
    const emailIsNotUnique = await userComponent.findUserByEmail(email)
    if (emailIsNotUnique) {
        return messageComponent.emailExist(res)
    }
    const newPassword = await utilComponent.hashPassword(password)
    const user = await userComponent.createUser(userName, email, newPassword)
    return messageComponent.showUser(res, user)
}
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return messageComponent.emptyField(res)
    }
    const user = await userComponent.findUserByEmail(email)
    if (!user) {
        return messageComponent.userNotExist(res)
    }
    const doMatch = await utilComponent.comparePassword(password, user.password)
    if (!doMatch) {
        return messageComponent.wrongPassword(res)
    }
    const token = await userComponent.createUserToken(user)
    return messageComponent.createToken(res, token)
}
const userProfile = async (req, res) => {
    const { _id } = req.user
    const user = await userComponent.findUserById(_id)
    return messageComponent.showUser(res, user)
}
const editProfile = async (req, res) => {
    const { _id } = req.user
    const { userName, email } = req.body;
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!userName) {
        return messageComponent.emptyField(res)
    }
    if (!email || !regex.test(email)) {
        return messageComponent.emailNotValid(res)
    }
    const emailIsNotUnique = await userComponent.findUserByEmail(email)
    if (emailIsNotUnique) {
        return messageComponent.emailExist(res)
    }
    await userComponent.updateUser(_id, userName, email)
    const user = await userComponent.findUserById(_id)
    return messageComponent.showUser(res, user)
}
const getProducts = async (req, res) => {
    const products = await utilComponent.findProducts()
    return messageComponent.showProducts(res, products)
}
const getProduct = async (req, res) => {
    const { id } = req.params
    const product = await utilComponent.findProduct(id)
    if (!product) messageComponent.productNotExist(res)
    return messageComponent.showProduct(res, product)
}
const orderProduct = async (req, res) => {
    const { _id } = req.user
    const user = await userComponent.findUserById(_id)
    if (!user) return messageComponent.userNotExist(res)
    const { productId, pay, quantity } = req.body
    const product = await utilComponent.findProduct(productId)
    if (!product) return messageComponent.productNotExist(res)
    if (product.price !== parseInt(pay)) return messageComponent.productPriceChange(res)
    if (product.count < quantity) return messageComponent.productNotEnough(res)
    const order = await utilComponent.createOrder(pay, quantity, user, product)
    return messageComponent.showOrder(res, order)
}
module.exports = {
    userRegister,
    userLogin,
    userProfile,
    editProfile,
    getProducts,
    getProduct,
    orderProduct
}