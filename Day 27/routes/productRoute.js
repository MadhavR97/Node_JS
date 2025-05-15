const express = require('express')
const route = express.Router()
const passport = require('../middleware/passport')
const { addProduct, addProductData, viewProduct } = require('../controller/product_ctl')

// Render Category
route.get('/add_product', passport.checkAuth, addProduct)
route.get('/view_product', passport.checkAuth, viewProduct)

// Add Data
route.post('/add_productData', passport.checkAuth, addProductData)

module.exports = route