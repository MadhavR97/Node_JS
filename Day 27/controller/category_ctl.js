const catschema = require('../model/categorySchema')

module.exports.addCategory = (req, res) => {
    res.render('addCategory')
}

module.exports.addCategoryData = async (req, res) => {
    req.body.image = req.file.path
    await catschema.create(req.body).then(() => {
        res.redirect('/category/addCategory')
    })
}

module.exports.viewCategory = async (req, res) => {
    await catschema.find({}).then((data) => {
        res.render('viewCategory', { data })
    })
}