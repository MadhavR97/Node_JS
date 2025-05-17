const catSchema = require('../model/catSchema')
const subCategorySchema = require('../model/sub-catSchema')

module.exports.add_subCategory = async (req, res) => {
    await catSchema.find({}).then((data) => {
        res.render('add_sub-category', { data })
    })
}

module.exports.add_subCategoryData = async (req, res) => {
    await subCategorySchema.create(req.body).then(() => {
        res.redirect('/sub-category/Add_SubCat')
    })
}

module.exports.view_subCategory = async (req, res) => {
    await subCategorySchema.find({}).populate('categoryId').then((data) => {
        res.render('view_sub-category', { data })
    })
}