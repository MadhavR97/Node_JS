const mongoose = require('mongoose')

const schema = mongoose.Schema({
    catName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const catSchema = mongoose.model('Category', schema)

module.exports = catSchema