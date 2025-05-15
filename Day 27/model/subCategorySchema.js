const mongoose = require('mongoose')

const schema = mongoose.Schema({
    subCatName: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
})

const subCatSchema = mongoose.model('SubCategory', schema)

module.exports = subCatSchema