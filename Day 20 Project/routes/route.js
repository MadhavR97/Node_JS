const express = require('express')
const { dashbord, addAdmin, addData, viewAdmin, editPage, updateData, deleteData, login, loginData, logout } = require('../controller/ctl')
const multer = require('../middleware/multer')
const route = express.Router()
const passport = require('../middleware/passportSt')

// Render
route.get('/', login)
route.get("/dashbord", passport.checkAuth, dashbord)
route.get('/add-Admin', passport.checkAuth, addAdmin)
route.get('/view-Admin', passport.checkAuth, viewAdmin)

// Login Data
route.post('/loginData', passport.authenticate("local", { failureRedirect: '/' }), loginData)

// Logout Data
route.get('/logout', logout)

// Form Add-Data
route.post('/addData', multer, addData)

// Edit-Page Render
route.get('/editData', editPage)

// Update Form Data
route.post('/updateData', multer, updateData)

// Delete Form Data
route.get('/deleteData', deleteData)

module.exports = route