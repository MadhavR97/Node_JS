const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1/AdminPanelProject")

const db = mongoose.connection

db.once("open", (error) => {
    error ? console.log(error) : console.log(`Database connected`)
})

module.exports = db