const express = require('express')
const port = 3000

const app = express()

app.get('/', (req, res) => {
    res.write('<h1>This is express server framework</h1>')
    res.end()
})

app.listen(port, (error) => {
    error ? console.log(error) : console.log('Server Started on port :', port)
})