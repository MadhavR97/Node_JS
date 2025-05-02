const express = require('express')
const port = 3000
const db = require('./config/db')
const path = require('path')
const passport = require('passport')
const session = require('express-session')

const app = express()

app.set("view engine", "ejs")

// App Use
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(session({
    name: "local",
    secret: "madhav",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use("/", require("./routes/route"))

app.listen(port, (error) => {
    error ? console.log(error) : console.log(`Started server on port: ${port}`)
})