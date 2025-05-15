const express = require('express')
const port = 3000
const db = require('./config/db')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const connectFlash = require('./middleware/flash')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use('/upload', express.static(path.join(__dirname, 'upload')))

app.use(session({
    name: 'local',
    secret: 'Madhav',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 5 }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(connectFlash.setFlash)

app.use('/', require('./routes/route'))

app.listen(port, (error) => {
    error ? console.log(error) : console.log(`Started server on port: ${port}`)
})