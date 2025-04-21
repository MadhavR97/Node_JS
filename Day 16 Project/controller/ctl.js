const schema = require('../model/firstSchema')
const fs = require('fs')

// Read Data

module.exports.firstPage = async (req, res) => {
    const movies = await schema.find({})
    res.render('index', { movies })
}

// Form Render Data

module.exports.MovieForm = async (req, res) => {
    res.render('addMovie')
}

// Add Data

module.exports.addData = async (req, res) => {
    req.body.image = req.file.path
    await schema.create(req.body)
    res.redirect('/')
}

// Edit Page Data

module.exports.EditMovie = async (req, res) => {
    let singleData = await schema.findById(req.query.id)
    res.render('edit', { singleData })
}

// Update Data

module.exports.UpdateMovie = async (req, res) => {
    const singleData = await schema.findById(req.body.id);
    let img = req.file ? req.file.path : singleData.image;

    req.file && fs.unlinkSync(singleData.image)

    req.body.image = img;

    await schema.findByIdAndUpdate(req.body.id, req.body);
    res.redirect('/');
}

// Delete Data

module.exports.DeleteMovie = async (req, res) => {
    const singleData = await schema.findById(req.query.id)
    fs.unlinkSync(singleData.image)

    await schema.findByIdAndDelete(req.query.id)
    res.redirect('/')
}

// Single Page Data

module.exports.SinglePage = async (req, res) => {
    const singleData = await schema.findById(req.query.id)
    res.render('singlePage', { singleData })
}