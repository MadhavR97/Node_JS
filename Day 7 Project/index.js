const express = require('express')
const port = 3000
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

let task = []

// Read Data

app.get('/', (req, res) => {
    res.render('index', { task })
})

// Add Data

app.post('/addTask', (req, res) => {
    req.body.id = task.length + 1
    task.push(req.body)
    res.redirect('/')
})

// Edit Page Data

app.get('/editTask/:id', (req, res) => {
    let singleTask = task.find((item) => item.id == req.params.id)
    res.render('edit', { singleTask })
})

// Update Data

app.post('/updateTask', (req, res) => {
    task.map((item) => {
        if (item.id == req.body.id) {
            item.task = req.body.task
        }
        else {
            item
        }
    })
    res.redirect('/')
})

// Delete Data

app.get('/deleteTask', (req, res) => {
    let newTask = task.filter((item) => item.id != req.query.id)
    task = newTask
    res.redirect('/')
})

app.listen(port, (error) => {
    error ? console.log(error) : console.log(`Started server on port: ${port}`)
})