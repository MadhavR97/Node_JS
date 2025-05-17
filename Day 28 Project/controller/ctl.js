const schema = require('../model/schema')
const fs = require('fs')
const mailer = require('../middleware/mailer')

//Render Login
module.exports.login = (req, res) => {
    res.render('login')
}

// Login Data
module.exports.loginData = async (req, res) => {
    res.redirect('/dashbord')
}

// Render Signup
module.exports.signup = (req, res) => {
    res.render('signup')
}

// Signup Data
module.exports.signupData = async (req, res) => {
    req.body.image = req.file.path
    await schema.create(req.body).then(() => {
        res.redirect('/signup')
    })
}

//Logout Data
module.exports.logout = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log(`Session destroy error: ${error}`)
        }
        else {
            res.clearCookie('local')
            res.redirect('/')
        }
    })
}

// Render Dashbord
module.exports.dashbord = (req, res) => {
    res.render('dashbord')
}

// View Users Data
module.exports.viewUsers = async (req, res) => {
    await schema.find({}).then((data) => {
        res.render('viewUsers', { data })
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
        res.redirect('/viewUsers')
    })
}

//Dalete Data
module.exports.deleteData = async (req, res) => {
    let singleData = await schema.findById(req.query.id)
    fs.unlinkSync(singleData?.image)

    await schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect('/viewUsers')
    })
}

// Render Profile
module.exports.profile = (req, res) => {
    res.render('profile')
}

// Change Password Render
module.exports.changePassword = (req, res) => {
    res.render('changePassword')
}

// Change Password Data
module.exports.changePasswordData = async (req, res) => {
    let admin = req.user

    if (admin.password == req.body.oldPassword) {
        if (req.body.oldPassword != req.body.newPassword) {
            if (req.body.newPassword == req.body.confirmPassword) {
                await schema.findByIdAndUpdate(admin.id, { password: req.body.newPassword })
                res.redirect('/logout')
            }
            else {
                req.flash('error_msg', 'New and confirm password must to be the same')
                res.redirect('/changePassword')
            }
        }
        else {
            req.flash('error_msg', 'New password must to be new')
            res.redirect('/changePassword')
        }
    }
    else {
        req.flash('error_msg', 'Old password is wrong')
        res.redirect('/changePassword')
    }
}

// Forgot Password Render
module.exports.forgotPassword = (req, res) => {
    res.render('forgotPassword')
}

// Recover / Forgot Password
module.exports.forgetPasswordData = async (req, res) => {

    // Find input email that user enter
    let admin = await schema.findOne({ email: req.body.email })

    // If not then send error msg
    if (!admin) {
        req.flash('error_msg', 'Email is not registered')
        res.redirect('/forgotPassword')
    }

    // If Admin is found then create otp and send
    let otp = Math.floor(Math.random() * 100000 + 900000)

    mailer.sendOTP(req.body.email, otp)

    // send otp and admin data to session
    req.session.otp = otp
    req.session.adminData = admin

    res.render('verifyOTP')
}

// verify OTP Data
module.exports.verifyOTP = async (req, res) => {

    // Get otp and admin from session
    let otp = req.session.otp
    let admin = req.session.adminData

    // verify and update password
    if (req.body.otp == otp) {
        if (req.body.newPassword == req.body.confirmPassword) {
            let adminData = await schema.findByIdAndUpdate(admin._id, { password: req.body.newPassword })
            adminData && res.redirect('/logout')
        }
        else {
            console.log('New and confirm password must to be the same')
        }
    }
    else {
        res.redirect('/')
    }
}