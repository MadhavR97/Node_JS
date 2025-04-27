const schema = require('../model/schema')

module.exports.login = (req, res) => {
    res.render('login')
}

module.exports.loginData = async (req, res) => {
    let admin = await schema.findOne({ email: req.body.email })

    if (!admin) {
        res.redirect('/')
    }
    else if (admin.password != req.body.password) {
        res.redirect('/')
    }
    else {
        // Create Cookie
        res.cookie('admin', admin)

        res.redirect('/dashbord')
    }
}

module.exports.dashbord = async (req, res) => {
    // if Cookie Created then redirect Dashbord Page else redirect Login page
    if (req.cookies.admin) {
        await schema.find({}).then((data) => {
            res.render('dashbord', { data })
        })
    }
    else {
        res.redirect('/')
    }
}

// Logout code
module.exports.logout = async (req, res) => {
    res.clearCookie('admin')
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

