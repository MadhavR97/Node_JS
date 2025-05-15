const mongoose = require('mongoose')

const schema = mongoose.Schema({
    first: {
        type: String,
        require: true
    },
    last: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    }
})

const firstSchema = mongoose.model('Admin', schema)

module.exports = firstSchema