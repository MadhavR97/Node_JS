const express = require('express')
const port = 3000
const db = require('./config/db')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use('/upload', express.static(path.join(__dirname, 'upload')))
app.use(cookieParser())

app.use('/', require('./routes/route'))

app.listen(port, (error) => {
    error ? console.log(error) : console.log(`Started server on port: ${port}`)
})