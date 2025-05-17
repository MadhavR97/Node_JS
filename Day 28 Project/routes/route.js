const express = require('express')
const route = express.Router()
const multer = require('../middleware/multer')
const passport = require('../middleware/passport')
const { login, signup, signupData, loginData, dashbord, logout, viewUsers, profile, editPage, updateData, deleteData, changePassword, changePasswordData, forgotPassword, forgetPasswordData, verifyOTP } = require('../controller/ctl')

// Render
route.get('/', login)
route.get('/signup', signup)
route.get('/dashbord', passport.checkAuth, dashbord)
route.get('/logout', logout)
route.get('/viewUsers', passport.checkAuth, viewUsers)
route.get('/editData', passport.checkAuth, editPage)
route.get('/deleteData', deleteData)
route.get('/profile', passport.checkAuth, profile)
route.get('/changePassword', passport.checkAuth, changePassword)
route.get('/forgotPassword', forgotPassword)

// Post Data
route.post('/signupData', multer, signupData)
route.post('/loginData', passport.authenticate('local', { failureRedirect: '/' }), loginData)
route.post('/updateData', multer, updateData)
route.post('/changePasswordData', changePasswordData)
route.post('/forgotPasswordData', forgetPasswordData)
route.post('/verifyOTPData', verifyOTP)

module.exports = route