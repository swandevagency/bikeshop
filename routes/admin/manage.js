router.get('/', adminVerify, adminController.getProducts)
router.get('/:id', adminVerify,adminController.getProduct) 
router.post('/create', adminVerify,adminController.addProduct)
router.put('/edit/:id', adminVerify, adminController.editProduct)
router.delete('/:id', adminVerify,adminController.deleteProduct)

module.exports = router;