const express = require('express')
const db = require('./config/db')
const port = 3000

const passport = require('passport')

//Install Express-session module - "npm i express-session"
const session = require('express-session')

//Install connect-flash node module
//npm i connect-flash
//Import connect-flash
const flash = require('connect-flash')

//import custom flash
const connetFlash = require('./middleware/flash')

const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

// Use in app
app.use(session({
    name: "local",
    secret: "MD",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 }
}))

// Use in App
app.use(passport.initialize())
app.use(passport.session())

//Initialize flash in app
app.use(flash())

//Use middleware flash in app
app.use(connetFlash.setFlash)

app.use('/', require('./routes/route'))

app.listen(port, (error) => {
    error ? console.log(error) : console.log('Started server on port', + port)
})