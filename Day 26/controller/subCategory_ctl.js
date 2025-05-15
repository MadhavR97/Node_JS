const catSchema = require('../model/categorySchema')
const subCategorySchema = require('../model/subCategorySchema')

module.exports.add_subCategory = async (req, res) => {
    await catSchema.find({}).then((data) => {
        res.render('add_SubCategory', { data })
    })
}

module.exports.add_subCategoryData = async (req, res) => {
    await subCategorySchema.create(req.body).then(() => {
        res.redirect('/subCategory/add_subCategory')
    })
}

module.exports.view_subCategory = async (req, res) => {
    await subCategorySchema.find({}).populate('categoryId').then((data) => {
        res.render('view_Subcategory', { data })
        console.log(data)
    })
}