const express = require('express')
const route = express.Router()
const { dashbord, addAdmin, viewAdmin, addData, editPage, updateData, deleteData, login, loginData, logout, profile, changePassword, changePasswordData, forgetPassword, verifyOTP } = require('../controller/ctl')
const multer = require('../middleware/multer')
const passport = require('../middleware/passport')

//Render
route.get('/', login)
route.get('/dashbord', passport.checkAuth, dashbord)
route.get('/addAdmin', addAdmin)
route.get('/viewAdmin', passport.checkAuth, viewAdmin)
route.get('/profile', passport.checkAuth, profile)
route.get('/changePassword', passport.checkAuth, changePassword)

//Login Data
route.post('/loginData', passport.authenticate('local', { failureRedirect: '/' }), loginData)

//Add Data from Form
route.post('/addData', multer, addData)

//Edit Page Data
route.get('/editData', editPage)

//Update Data
route.post('/updateData', multer, updateData)

//Delete Data
route.get('/deleteData', deleteData)

//Change Password Data
route.post('/changePasswordData', changePasswordData)

// Recover / Forget Password
route.post('/recoverPassword', forgetPassword)

// Verify OTP Data
route.post('/verifyOTP', verifyOTP)

//Logout Data
route.get('/logout', logout)

module.exports = route