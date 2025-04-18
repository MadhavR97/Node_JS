const express = require('express')
const db = require('./config/db')
const schema = require('./model/firstSchema')
const port = 3000

const app = express()

app.listen(port, (error) => {
    error ? console.log(error) : console.log(`Started server on port : ${port}`)
})