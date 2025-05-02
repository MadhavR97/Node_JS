const express = require('express')
const route = express.Router()
const { dashbord, signup, addData, deleteData, login, loginData, logout } = require('../controller/ctl')
const passport = require('../middleware/passportSt')

route.get('/', login)
route.post('/loginData', passport.authenticate("local", { failureRedirect: "/" }), loginData)
route.get('/logout', logout)
route.get('/dashbord', passport.checkAuth, dashbord)
route.get('/signup', signup)
route.post('/addData', addData)
route.get('/deleteData', deleteData)

module.exports = route