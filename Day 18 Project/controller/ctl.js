const schema = require('../model/schema')
const fs = require('fs')

//Render Login Page
module.exports.login = (req, res) => {
    res.render('login')
}

//Login Data
module.exports.loginData = async (req, res) => {
    let admin = await schema.findOne({ email: req.body.email })

    if (!admin) {
        res.redirect('/')
    }
    else if (admin.password != req.body.password) {
        res.redirect('/')
    }
    else {
        res.cookie('admin', admin)
        res.redirect('/dashbord')
    }
}

// Render Dashbord
module.exports.dashbord = (req, res) => {
    if (req.cookies.admin) {
        res.render('dashbord')
    }
    else {
        res.redirect('/')
    }
}

// Render Form
module.exports.addAdmin = (req, res) => {
    res.render('addAdmin')
}

// Read Data & Render Table
module.exports.viewAdmin = async (req, res) => {
    if (req.cookies.admin) {
        await schema.find({}).then((data) => {
            res.render('viewAdmin', { data })
        })
    }
    else {
        res.redirect('/')
    }
}

// Add Data from Form
module.exports.addData = async (req, res) => {
    req.body.image = req.file.path
    await schema.create(req.body).then(() => {
        res.redirect('/addAdmin')
    })
}

// Edit Page Data
module.exports.editPage = async (req, res) => {
    let singleData = await schema.findById(req.query.id)
    res.render('edit', { singleData })
}

// Update Data
module.exports.updateData = async (req, res) => {
    let singleData = await schema.findById(req.body.id)
    const img = req.file ? req.file.path : singleData.image

    req.file && fs.unlinkSync(singleData.image)

    req.body.image = img

    await schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect('/viewAdmin')
    })
}

//Dalete Data
module.exports.deleteData = async (req, res) => {
    let singleData = await schema.findById(req.query.id)
    fs.unlinkSync(singleData?.image)

    await schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect('/viewAdmin')
    })
}

//Logout Data
module.exports.logout = (req, res) => {
    res.clearCookie('admin')
    res.redirect('/')
}