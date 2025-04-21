const express = require('express')
const ctl = require('../controller/ctl')
const multer = require('../middleware/multer')
const route = express.Router()

route.get('/', ctl.firstPage)
route.get('/gotoAddMovie', ctl.MovieForm)
route.post('/addData', multer, ctl.addData)
route.get('/editData', ctl.EditMovie)
route.post('/updateData', multer, ctl.UpdateMovie)
route.get('/deleteData', ctl.DeleteMovie)
route.get('/singlePage', ctl.SinglePage)

module.exports = route