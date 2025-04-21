const express = require('express')
const db = require('./config/db')
const router = require('./routes/route')
const path = require('path')
const port = 3000

const app = express()

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use('/upload', express.static(path.join(__dirname, 'upload')))

const movies = []

app.use('/', router)

app.listen(port, (error) => {
    error ? console.log(error) : console.log(`Started server on port : ${port}`)
})