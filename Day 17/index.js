const express = require('express')
const db = require('./config/db')
const port = 3000

// Install Cookie-Parse node module - "npm i cookie-parser"
const cookieParser = require('cookie-parser')


const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

// Use in app
app.use(cookieParser())

app.use('/', require('./routes/route'))

app.listen(port, (error) => {
    error ? console.log(error) : console.log('Started server on port', + port)
})