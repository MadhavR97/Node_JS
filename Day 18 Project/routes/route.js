const express = require('express')
const route = express.Router()
const { dashbord, addAdmin, viewAdmin, addData, editPage, updateData, deleteData, login, loginData, logout } = require('../controller/ctl')
const multer = require('../middleware/multer')

//Render
route.get('/', login)
route.get('/dashbord', dashbord)
route.get('/addAdmin', addAdmin)
route.get('/viewAdmin', viewAdmin)

//Login Data
route.post('/loginData', loginData)

//Add Data from Form
route.post('/addData', multer, addData)

//Edit Page Data
route.get('/editData', editPage)

//Update Data
route.post('/updateData', multer, updateData)

//Delete Data
route.get('/deleteData', deleteData)

//Logout Data
route.get('/logout', logout)

module.exports = route