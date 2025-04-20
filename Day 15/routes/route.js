const express = require('express')
const multer = require('../middleware/multer')
const router = express.Router()
const ctl = require('../controller/ctl')

router.get('/', ctl.firstPage)
router.post('/addData', multer, ctl.addData)
router.get('/editData', ctl.editPage)
router.post('/updateData', multer, ctl.updateData)
router.get('/deleteData', ctl.deleteData)

module.exports = router
