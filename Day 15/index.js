const express = require('express')
const db = require('./config/db')
const schema = require('./model/firstSchema')
const multer = require('./middleware/multer')
const path = require('path')
const fs = require('fs')
const router = require('./routes/route')
const port = 3000

const app = express()

app.set('view engine', 'ejs')
app.use('/upload', express.static(path.join(__dirname, 'upload')))

app.use('/', router)

app.listen(port, (error) => {
    error ? console.log(error) : console.log(`Started server on port : ${port}`)
})