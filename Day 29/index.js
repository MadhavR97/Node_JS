const express = require('express')
const port = 3000
const db = require('./config/db')

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use('/', require('./routes/route'))

app.listen(port, (error) => {
    error ? console.log(error) : console.log(`Server started on port: ${port}`)
})