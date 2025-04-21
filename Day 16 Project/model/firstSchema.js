const mongoose = require('mongoose')

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
})

const firstSchema = mongoose.model('Movies', schema)

module.exports = firstSchema