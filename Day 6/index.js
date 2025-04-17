const express = require('express')
const port = 3000

const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

let students = []

//Read Data

app.get('/', (req, res) => {
    res.render('index', { students })
})

//Add Data

app.post('/addData', (req, res) => {
    req.body.id = students.length + 1
    students.push(req.body)
    res.redirect('/')
})

//Edit Page Data

app.get('/editData/:id', (req, res) => {
    let singleData = students.find((item) => item.id == req.params.id)
    res.render('edit', { singleData })
})

//Update Data

app.post('/updateData', (req, res) => {
    students.map((item) => {
        if (item.id == req.body.id) {
            item.name = req.body.name,
            item.email = req.body.email,
            item.course = req.body.course,
            item.city = req.body.city
        }
        else {
            item
        }
    })
    res.redirect('/')
})

//Delete Data

app.get('/deleteData', (req, res) => {
    let delData = students.filter((item) => item.id != req.query.id)
    students = delData
    res.redirect('/')
})

app.listen(port, (error) => {
    error ? console.log(error) : console.log(`Started server on port : ${port}`)
})