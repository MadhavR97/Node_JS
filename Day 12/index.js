const express = require('express')
const db = require('./config/db')
const schema = require('./model/firstSchema')
const port = 3000

const app = express()

const students = []

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

// Read Data

app.get('/', async (req, res) => {
    await schema.find({}).then((students) => {
        res.render('index', { students })
    })
})

// Add Data

app.post('/addData', async (req, res) => {
    await schema.create(req.body).then(() => {
        res.redirect('/')
    })
})

// Edit Page Data

app.get('/editData/:id', async (req, res) => {
    // console.log(req.params.id)
    await schema.findById(req.params.id).then((singleData) => {
        res.render('edit', { singleData })
    })
})

// Update Data

app.post('/updateData', async (req, res) => {
    await schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect('/')
    })
})

// Delete Data

app.get('/deleteData', async (req, res) => {
    await schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect('/')
    })
})

app.listen(port, (error) => {
    error ? console.log(error) : console.log(`Started server on port : ${port}`)
})