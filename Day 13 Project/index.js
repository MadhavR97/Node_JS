const express = require('express')
const port = 3000
const app = express()
const db = require('./config/db')
const schema = require('./model/Schema')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

let books = []

app.get('/', async (req, res) => {
    await schema.find({}).then((books) => {
        res.render('index', { books })
    })
})

app.get('/form', async (req, res) => {
    await schema.find({}).then((books) => {
        res.render('form', { books })
    })
})

app.post('/addData', async (req, res) => {
    await schema.create(req.body).then(() => {
        res.redirect('/')
    })
})

app.get('/editData/:id', async (req, res) => {
    await schema.findById(req.params.id).then((singleData) => {
        res.render('edit', { singleData })
    })
})

app.post('/updateData', async (req, res) => {
    await schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect('/')
    })
})

app.get('/deleteData', async (req, res) => {
    await schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect('/')
    })
})

app.listen(port, (error) => {
    error ? console.log(error) : console.log('Started server on port:', port)
})