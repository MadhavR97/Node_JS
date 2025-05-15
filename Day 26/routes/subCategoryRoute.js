const express = require('express')
const route = express.Router()
const passport = require('../middleware/passport')
const { add_subCategory, add_subCategoryData, view_subCategory } = require('../controller/subCategory_ctl')

// Render Category
route.get('/add_subCategory', passport.checkAuth, add_subCategory)
route.get('/view_subCategory', passport.checkAuth, view_subCategory)

// Add Data
route.post('/add_subCategoryData', passport.checkAuth, add_subCategoryData)

module.exports = route