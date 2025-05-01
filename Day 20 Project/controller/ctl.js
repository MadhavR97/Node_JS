const schema = require('../model/schema')
const fs = require('fs')

// Login Page Render
module.exports.login = (req, res) => {
    res.render('login')
}

// Login Data
module.exports.loginData = (req, res) => {
    res.redirect('/dashbord')
}

// Logout data
module.exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log("Session destroy error:", err);
        }
        res.clearCookie('local');
        res.redirect('/');
    });
};

// Dashbord Render
module.exports.dashbord = (req, res) => {
    res.render('dashbord')
}

// Add-Admin Form Render
module.exports.addAdmin = (req, res) => {
    res.render('add-Admin')
}

// View-Admin Render
module.exports.viewAdmin = async (req, res) => {
    await schema.find({}).then((data) => {
        res.render('view-Admin', { data })
    })
}

// Add-Data Form
module.exports.addData = async (req, res) => {
    req.body.image = req.file.path
    await schema.create(req.body).then(() => {
        res.redirect('/add-Admin')
    })
}

// Edit-Page Render
module.exports.editPage = async (req, res) => {
    let singleData = await schema.findById(req.query.id)
    res.render('edit', { singleData })
}

// Update Form Data 
module.exports.updateData = async (req, res) => {
    let singleData = await schema.findById(req.body.id)
    let img = req.file ? req.file.path : singleData.image

    req.file && fs.unlinkSync(singleData.image)

    req.body.image = img

    await schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect('/view-Admin')
    })
}

// Delete Form Data
module.exports.deleteData = async (req, res) => {
    let singleData = await schema.findById(req.query.id)
    fs.unlinkSync(singleData.image)

    await schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect('/view-Admin')
    })
}