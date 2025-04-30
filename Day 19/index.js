const express = require('express')
const db = require('./config/db')
const port = 3000

//Install Passport module - "npm i passport"
//Install Passport module - "npm i passport-local"
const passport = require('passport')

//Install Express-session module - "npm i express-session"
const session = require('express-session')

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

app.use('/', require('./routes/route'))

app.listen(port, (error) => {
    error ? console.log(error) : console.log('Started server on port', + port)
})