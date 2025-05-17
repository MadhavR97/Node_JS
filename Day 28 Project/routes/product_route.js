const express = require('express')
const route = express.Router()
const passport = require('../middleware/passport')
const { addProduct, viewProduct, addProductData } = require('../controller/product_ctl')

// Render Category
route.get('/Add_Product', passport.checkAuth, addProduct)
route.get('/View_Product', passport.checkAuth, viewProduct)

// Add Data
route.post('/add_productData', passport.checkAuth, addProductData)

module.exports = route