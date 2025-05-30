const express = require('express')
const route = express.Router()
const { getStudents, addStudent, updateStudent, deleteStudent } = require('../controller/student_ctl')

route.get('/getstudents', getStudents)
route.post('/addstudent', addStudent)
route.put('/updatestudent/:id', updateStudent)
route.delete('/deletestudent/:id', deleteStudent)

module.exports = route
