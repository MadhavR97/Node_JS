const express = require('express')
const route = express.Router()
const passport = require('../middleware/passport')
const { add_subCategory, add_subCategoryData, view_subCategory } = require('../controller/sub-cat_ctl')

// Render Category
route.get('/Add_SubCat', passport.checkAuth, add_subCategory)
route.get('/View_SubCat', passport.checkAuth, view_subCategory)

// Add Data
route.post('/add_sub-catData', passport.checkAuth, add_subCategoryData)

module.exports = route