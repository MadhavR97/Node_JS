const express = require('express')
const auth = require('../middleware/auth')
const route = express.Router()
const { signup, login, dashboard, getStudents } = require('../controller/ctl')

// Routes
route.post('/signup', signup)
route.post('/login', login)
route.get('/dashboard', auth, dashboard)

module.exports = route