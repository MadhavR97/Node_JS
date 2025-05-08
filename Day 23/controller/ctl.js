const schema = require('../model/schema')

module.exports.login = (req, res) => {
    res.render('login')
}

module.exports.loginData = async (req, res) => {
    //Type your success_msg
    req.flash('success_msg', 'Login Successfull')
    res.redirect('/dashbord')
}

module.exports.dashbord = async (req, res) => {
    await schema.find({}).then((data) => {
        res.render('dashbord', { data })
    })
}

// Logout code
module.exports.logout = async (req, res) => {
    req.session.destroy()
    res.redirect('/')
}

module.exports.signup = (req, res) => {
    res.render('signup')
}

module.exports.addData = async (req, res) => {
    await schema.create(req.body).then(() => {
        res.redirect('/')
    })
}

module.exports.deleteData = async (req, res) => {
    await schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect('/dashbord')
    })
}

// Change Password Render
module.exports.changePassword = (req, res) => {
    res.render('changePassword')
}

// Change Password Data
module.exports.changePassData = async (req, res) => {
    let admin = req.user

    if (admin.password == req.body.oldPassword) {
        if (req.body.newPassword != req.body.oldPassword) {
            if (req.body.newPassword == req.body.confirmPassword) {
                await schema.findByIdAndUpdate(admin.id, { password: req.body.newPassword })
                    .then(() => {
                        res.redirect("/logout")
                    })
            }
            else {
                req.flash("error_msg", "New and confirm password has to be same!")
                res.redirect("/changePassword")
            }
        }
        else {
            req.flash("error_msg", "New password has to be new!")
            res.redirect("/changePassword")
        }
    }
    else {
        req.flash("error_msg", "Old password is wrong")
        res.redirect("/changePassword")
    }
}