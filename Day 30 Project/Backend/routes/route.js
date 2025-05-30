const express = require('express')
const route = express.Router()
const { getData, addData, deleteData, updateData } = require('../controller/ctl')

route.get('/getData', getData)
route.post('/addData', addData)
route.put('/updateData', updateData)
route.delete('/deleteData', deleteData)

module.exports = route