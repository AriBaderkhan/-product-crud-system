const express = require('express')
const router = express.Router()
const {addProduct , showAllProduct , showAProduct , updateTheProduct , deleteTheProduct} = require('../controllers/productController');
const {validateProductAdd , validateProductUpdate} = require('../validations/productValidate')


router.post('/add', validateProductAdd , addProduct)
router.get('/showall',showAllProduct)
router.get('/show/:id',showAProduct)
router.put('/update/:id', validateProductUpdate ,updateTheProduct)
router.delete('/delete/:id',deleteTheProduct)

module.exports = router;