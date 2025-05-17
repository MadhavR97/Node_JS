const catSchema = require('../model/catSchema')

module.exports.addCategory = (req, res) => {
    res.render('add_category')
}

module.exports.addCategoryData = async (req, res) => {
    req.body.image = req.file.path
    await catSchema.create(req.body).then(() => {
        res.redirect('/category/Add_Cat')
    })
}

module.exports.viewCategory = async (req, res) => {
    await catSchema.find({}).then((data) => {
        res.render('view_category', { data })
    })
}