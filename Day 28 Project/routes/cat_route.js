const express = require('express')
const route = express.Router()
const multer = require('../middleware/multer')
const passport = require('../middleware/passport')
const { addCategory, addCategoryData, viewCategory } = require('../controller/cat_ctl')

// Render Category
route.get('/Add_Cat', passport.checkAuth, addCategory)
route.get('/View_Cat', passport.checkAuth, viewCategory)

// Category Post Data 
route.post('/add_catData', passport.checkAuth, multer, addCategoryData)

module.exports = route