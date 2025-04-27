const express = require('express')
const route = express.Router()
const { dashbord, signup, addData, deleteData, login, loginData, logout } = require('../controller/ctl')

route.get('/', login)
route.post('/loginData', loginData)
route.get('/logout', logout)
route.get('/dashbord', dashbord)
route.get('/signup', signup)
route.post('/addData', addData)
route.get('/deleteData', deleteData)

module.exports = route