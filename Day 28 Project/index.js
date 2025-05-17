// Import node modules Files
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

// Use in app
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

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

// Routes
app.use('/', require('./routes/route'))
app.use('/category', require('./routes/cat_route'))
app.use('/sub-category', require('./routes/sub-cat_route'))
app.use('/product', require('./routes/product_route'))

// Server
app.listen(port, (error) => {
    error ? console.log(error) : console.log(`Started server on port: ${port}`)
})