const mongoose = require('mongoose')

const schema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true
    }
})

const product = mongoose.model('Product', schema)

module.exports = product