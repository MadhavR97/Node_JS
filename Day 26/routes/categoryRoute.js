const express = require('express')
const route = express.Router()
const multer = require('../middleware/multer')
const passport = require('../middleware/passport')
const { addCategory, addCategoryData, viewCategory } = require('../controller/category_ctl')

// Render Category
route.get('/addCategory', passport.checkAuth, addCategory)
route.get('/viewCategory', passport.checkAuth, viewCategory)

// Add Data
route.post('/addCategoryData', passport.checkAuth, multer, addCategoryData)

module.exports = route