const express = require('express')
const port = 3000

const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, (error) => {
    error ? console.log(error) : console.log(`Started server on port : ${port}`)
})