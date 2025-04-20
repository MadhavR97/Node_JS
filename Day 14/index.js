const express = require('express')
const db = require('./config/db')
const schema = require('./model/firstSchema')
const multer = require('./middleware/multer')
const path = require('path')
const fs = require('fs')
const port = 3000

const app = express()

app.set('view engine', 'ejs')
app.use('/upload', express.static(path.join(__dirname, 'upload')))

let students = []

// Read Data

app.get('/', async (req, res) => {
    await schema.find({}).then((students) => {
        res.render('index', { students })
    })
})

// Add Data

app.post('/addData', multer, async (req, res) => {
    req.body.image = req.file.path
    await schema.create(req.body).then(() => {
        res.redirect('/')
    })
})

// Edit Page Data

app.get('/editData', async (req, res) => {
    let singleData = await schema.findById(req.query.id)
    res.render('edit', { singleData })
})

// Update Data

app.post('/updateData', multer, async (req, res) => {
    let singleData = await schema.findById(req.body.id)
    let img = '';
    req.file ? img = req.file.path : img = singleData.image
    req.file && fs.unlinkSync(singleData.image)
    req.body.image = img

    await schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect('/')
    })
})

// Delete Data

app.get('/deleteData', async (req, res) => {
    let singleData = await schema.findById(req.query.id)
    fs.unlinkSync(singleData.image)

    await schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect('/')
    })
})

app.listen(port, (error) => {
    error ? console.log(error) : console.log(`Started server on port : ${port}`)
})