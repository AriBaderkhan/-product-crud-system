const express = require('express')
const router = express.Router()
const {addProduct , showAllProduct , showAProduct , updateTheProduct , deleteTheProduct} = require('../controllers/productController')


router.post('/add',addProduct)
router.get('/showall',showAllProduct)
router.get('/show/:id',showAProduct)
router.put('/update/:id',updateTheProduct)
router.delete('/delete/:id',deleteTheProduct)

module.exports = router;